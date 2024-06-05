import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscription } from 'src/app/model/inscription.model';

@Injectable({
  providedIn: 'root'
})
export class InscriptionformateurexternService {
  private baseUrl = 'http://localhost:8080/externe';
  constructor(private httpClient: HttpClient, ) { }
  inscriptionFormateurExtern(name: string, email: string, mots_cles: string): Observable<any> {
    const url = `${this.baseUrl}/inscription/${name}/${email}/${mots_cles}`;
    return this.httpClient.post<any>(url, null);
  }
  public showFormateursextern(): Observable<Inscription[]> {

      return this.httpClient.get<Inscription[]>(`${this.baseUrl}/getallfomateurexeterne`);
    }
    deleteAndCreateUserInfo(inscriptionId: number): Observable<string>{

      return this.httpClient.delete<string>(`${this.baseUrl}/deleteAndCreateUserInfo/${inscriptionId}`);
    }
    public getInscriptionById(id: number): Observable<Inscription> {
     
        return this.httpClient.get<Inscription>(`${this.baseUrl}/getInscriptionrById/${id}`);
      
    }
    public deleteinscriptions(id:number): Observable<any>{
      
      return this.httpClient.delete(`${this.baseUrl}/deleteinscription/`+id)
      


  }
}

