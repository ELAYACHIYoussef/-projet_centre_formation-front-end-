import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserAuthService } from './user-auth.service';
import { Calendrier } from 'src/app/model/Calendrier.modul';

@Injectable({
  providedIn: 'root'
})
export class CalendrierService {
  private API_BASE_URL = "http://localhost:8080";

  constructor(
    private httpClient: HttpClient,
    private userAuthService: UserAuthService
  ) {}

  public getEvents(): Observable<Calendrier[]> {
    const jwtToken = this.userAuthService.getToken();

    if (!jwtToken) {
      console.log('Token JWT non disponible');
      return throwError('Token JWT non disponible');
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwtToken,
      'Content-Type': 'application/json'
    });

    const url = `${this.API_BASE_URL}/calendrier/getEvents`;
    return this.httpClient.get<Calendrier[]>(url, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur lors du chargement des événements :', error);
          return throwError('Erreur lors du chargement des événements');
        })
      );
  }

  public addTraine(calendrier: Calendrier, formationId: number, formateurId: number, select: string): Observable<Calendrier> {
    const jwtToken = this.userAuthService.getToken();
  
    if (!jwtToken) {
      console.log('Token JWT non disponible');
      return throwError('Token JWT non disponible');
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwtToken,
      'Content-Type': 'application/json'
    });
  
    let url: string;
  
    if (select === 'entreprise' || select === 'groupe') {
      url = `${this.API_BASE_URL}/calendrier/addnewCalendar/${formationId}/${formateurId}/${select}`;
    } else {
      console.error('Sélection invalide pour la création du calendrier');
      return throwError('Sélection invalide pour la création du calendrier');
    }
  
    return this.httpClient.post<Calendrier>(url, calendrier, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de l\'ajout du calendrier :', error);
          return throwError('Erreur lors de l\'ajout du calendrier');
        })
      );
  }


  public getEventById(eventId: number): Observable<Calendrier> {
    const jwtToken = this.userAuthService.getToken();
  
    if (!jwtToken) {
      console.log('Token JWT non disponible');
      return throwError('Token JWT non disponible');
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwtToken,
      'Content-Type': 'application/json'
    });
  
    const url = `${this.API_BASE_URL}/calendrier/getEventById/${eventId}`;
  
    return this.httpClient.get<Calendrier>(url, { headers })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors de la récupération de l'événement avec l'ID ${eventId} :`, error);
          return throwError(`Erreur lors de la récupération de l'événement avec l'ID ${eventId}`);
        })
      );
  }


  public updateEvent(calendrier: any, select: string): Observable<Calendrier> {
    const jwtToken = this.userAuthService.getToken();
  
    if (!jwtToken) {
      console.log('Token JWT non disponible');
      return throwError('Token JWT non disponible');
    }
  
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwtToken,
      'Content-Type': 'application/json'
    });
  
    let url: string;
  
    if (select === 'entreprise' || select === 'groupe') {
      url = `${this.API_BASE_URL}/calendrier/updateCalendar/${select}`;
    } else {
      console.error('Sélection invalide pour la mise à jour du calendrier');
      return throwError('Sélection invalide pour la mise à jour du calendrier');
    }
  
    return this.httpClient.put<Calendrier>(url, calendrier, { headers })
      .pipe(
        catchError(error => {
          console.error('Erreur lors de la mise à jour du calendrier :', error);
          return throwError('Erreur lors de la mise à jour du calendrier');
        })
      );
  }
  

  public getEventsByFormateurId(formateurId: number): Observable<Calendrier[]> {
    const jwtToken = this.userAuthService.getToken();

    if (!jwtToken) {
      console.log('Token JWT non disponible');
      return throwError('Token JWT non disponible');
    }

    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwtToken,
      'Content-Type': 'application/json'
    });

    const url = `${this.API_BASE_URL}/calendrier/getEventsByFormateurId/${formateurId}`;
    return this.httpClient.get<Calendrier[]>(url, { headers })
      .pipe(
        catchError(error => {
          console.error(`Erreur lors du chargement des événements pour le formateur avec l'ID ${formateurId} :`, error);
          return throwError(`Erreur lors du chargement des événements pour le formateur avec l'ID ${formateurId}`);
        })
      );
  }
  
}
