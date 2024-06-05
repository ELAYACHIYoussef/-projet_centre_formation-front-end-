import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Groupe } from 'src/app/model/Group.model';
import { UserAuthService } from './user-auth.service';
import { Individus } from 'src/app/model/Individus.model';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  private apiUrl = 'http://localhost:8080';  // Remplacez par l'URL de votre backend

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  public getGroupes(): Observable<Groupe[]> {
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,
        'Content-Type': 'application/json'
      });
      return this.httpClient.get<Groupe[]>(`${this.apiUrl}/groupe/getAllGroupes`, { headers });
    } else {
      console.log('Token JWT non disponible');
    }
    return new Observable<any>();
  }

  public sendFeedbackEmail(groupeId: number): Observable<any> {
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + jwtToken,
        'Content-Type': 'application/json'
      });
      return this.httpClient.get(`${this.apiUrl}/groupe/sendemail/${groupeId}`, { headers });
    } else {
      console.log('Token JWT non disponible');
    }
    return new Observable<any>();
  }
  public getInscriptionEmailsForFormation(groupeId: number): Observable<Individus[]> {
    const jwtToken = this.userAuthService.getToken();
    if (jwtToken) {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwtToken,
      'Content-Type': 'application/json'
    });

    return this.httpClient.get<Individus[]>(`${this.apiUrl}/groupe/individus/${groupeId}`, { headers });
  }else{
    console.log('Token JWT non disponible');
  }
  return new Observable<any>();}

}
