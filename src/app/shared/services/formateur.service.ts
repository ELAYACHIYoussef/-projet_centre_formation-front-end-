import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Formateur } from 'src/app/model/Formateur.model';
import { UserAuthService } from './user-auth.service';

@Injectable({
  providedIn: 'root'
})
export class FormateurService {
  private API_BASE_URL = "http://localhost:8080/auth";
  private baseUrl = 'http://localhost:8080';
  constructor(private httpClient: HttpClient, 
    private userAuthService: UserAuthService) { }

  requestHeader = new HttpHeaders(
    { 'NO-AUTH': 'True' }
  );

  public addFormateur(formateur: Formateur): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,
        'Content-Type': 'application/json'
      });
      
      return this.httpClient.post(`${this.API_BASE_URL}/addNewUser`, formateur, { headers });
    } else {
      
      console.log('Token JWT non disponible');
      
    }
   return new Observable<any>();
  }

  public getFormateurProfile(): Observable<any> {
    return this.httpClient.get(`${this.API_BASE_URL}/format/formatProfile`, { responseType: "text" });
  }
  public getFormateurByNom(): Observable<any> {
    return this.httpClient.get(`${this.API_BASE_URL}/allFormateurByNom`);
  }
  public showFormateurs(): Observable<Formateur[]> {

    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,

        'Content-Type': 'application/json'
      });
      return this.httpClient.get<Formateur[]>(`${this.API_BASE_URL}/allFormateur`, { headers });
    }else{
      console.log('Token JWT non disponible');
    }
    return new Observable<any>();
  }

  public deleteFormateurs(id:number): Observable<any>{
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,

        'Content-Type': 'application/json'
      });
      console.log(jwtToken);
    return this.httpClient.delete(`${this.API_BASE_URL}/deleteFormateur/`+id,{ headers })
    }else {
      
      console.log('Token JWT non disponible');
      
    }
    return new Observable<any>();
  }
  public getFormateurById(id: number): Observable<Formateur> {
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,

        'Content-Type': 'application/json'
      });
      console.log(jwtToken);
      return this.httpClient.get<Formateur>(`${this.API_BASE_URL}/getFormateurById/${id}`, { headers });
    }else {
      
      console.log('Token JWT non disponible');
      
    }
    return new Observable<any>();
    
    
  }

  public updateFormateur(idfor:number,formateur:Formateur){
    return this.httpClient.put(`${this.API_BASE_URL}/updateUser/`+idfor,formateur)
  }

  inscriptionFormateurExtern(name: string, email: string, motsCles: string): Observable<any> {
    const url = `${this.baseUrl}/inscription/${name}/${email}/${motsCles}`;
    return this.httpClient.post<any>(url, null);
  }

  public getAverageRatingForFormateur(formateurId: number): Observable<number> {
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,
        'Content-Type': 'application/json'
      });
  
      return this.httpClient.get<number>(`${this.baseUrl}/evaluation/averageRating/${formateurId}`, { headers });
    } else {
      console.log('Token JWT non disponible');
    }
    return new Observable<number>();
  }
  
}
