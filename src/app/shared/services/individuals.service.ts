// individus.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Individus } from 'src/app/model/Individus.model';



@Injectable({
  providedIn: 'root',
})
export class IndividusService {
  private baseUrl = 'http://localhost:8080/individus';

  constructor(private http: HttpClient) {}

  inscription(individu: Individus, formationId: number): Observable<any> {
    const url = `${this.baseUrl}/inscription/${formationId}`;
    return this.http.post<any>(url, individu);
  }
   
  getIndividus():Observable<Individus[]>{
    return this.http.get<Individus[]>(`${this.baseUrl}/getAllIndividus`);
  }
  
  
}
