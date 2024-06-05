import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entreprise } from 'src/app/model/Entreprise.modul';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EntrepriseService {
  private apiUrl = 'http://localhost:8080';

  constructor(private httpClient: HttpClient,
    private userAuthService: UserAuthService
    ) { }

  addEntreprise(entreprise: Entreprise, headers: HttpHeaders): Observable<any> {
    const url = `${this.apiUrl}/entreprise/addNewEntreprise`;
    return this.httpClient.post(url, entreprise, { headers });
  }
  getEntreprises():Observable<Entreprise[]>{
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,

        'Content-Type': 'application/json'
      });
    return this.httpClient.get<Entreprise[]>(`${this.apiUrl}/entreprise/getallEntreprise`, {headers});
    }else{
      console.log('Token JWT non disponible');
    }
    return new Observable<any>();
   }
   public deleteEntreprise(id:number): Observable<any>{
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,
        'Content-Type': 'application/json'
      });
      return this.httpClient.delete(`${this.apiUrl}/entreprise/removeEntreprise/`+id, {headers});
    }else{
      console.log('Token JWT non disponible');
    }
    return new Observable<any>();

  }
  public updateEntreprise(id:number, entreprise:Entreprise): Observable<Entreprise>{
    const formData = new FormData();
    formData.append('name', entreprise.name);
    formData.append('phoneNumber', entreprise.phoneNumber.toString());
    formData.append('address', entreprise.address);
    formData.append('email', entreprise.email);
    formData.append('url', entreprise.url);
    
      return this.httpClient.put<Entreprise>(`${this.apiUrl}/entreprise/updateEntreprise/`+id, formData);
  }
  public getEntrepriseById(id:number){
    return this.httpClient.get<Entreprise>(`${this.apiUrl}/entreprise/geEntrepriseById/`+id)
 }

}
