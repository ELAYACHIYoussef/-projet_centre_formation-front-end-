import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, catchError, of } from 'rxjs';
import { FormationService } from './shared/services/formation.service';

@Injectable({
  providedIn: 'root'
})
export class FormationResolverService implements Resolve<any>{

  constructor(private formationService: FormationService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.params['id'];
    return this.formationService.getFormationById(id).pipe(
      catchError(error => {
        console.error('Erreur lors de la récupération des données de formation:', error);
        return of(null); 
      })
    );
  }
}
