// EvaluationService

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Evaluation } from 'src/app/model/Evaluation.modul';

@Injectable({
  providedIn: 'root'
})
export class EvaluationService {
  private apiUrl = 'http://localhost:8080/evaluation';
  private apiUrlcrypt = 'http://localhost:8080/crypt';

  constructor(private http: HttpClient) { }

  submitEvaluation(evaluationData: Evaluation, id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/add/${id}`, evaluationData);
  }

  hasSubmittedFeedback(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/hasSubmittedFeedback?userId=${id}`);
  }
  
  setFeedbackSubmitted(id: number): Observable<boolean> {
    return this.hasSubmittedFeedback(id).pipe(
      tap((hasSubmitted: boolean) => {
        if (hasSubmitted) {
          console.log('Le feedback a déjà été soumis.');
        } else {
          console.log('Le feedback n\'a pas encore été soumis.');
        }
      })
    );
  }

  decryptedId(encryptedId: string): Observable<number> {
    const endpoint = `${this.apiUrlcrypt}/${encryptedId}`;
    return this.http.get<number>(endpoint);
  }
}
