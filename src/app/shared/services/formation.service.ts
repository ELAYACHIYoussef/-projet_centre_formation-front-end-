import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Formation, Groupe } from 'src/app/model/formation.model';
import { UserAuthService } from './user-auth.service';
import { HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FormationService {
  private apiUrl = 'http://localhost:8080/form'; 

  constructor(private httpClient: HttpClient, private userAuthService: UserAuthService) { }

  requestHeader = new HttpHeaders({ 'NO-AUTH': 'True' });


  addFormation(formation: Formation, imageFile: File): Observable<Formation> {
    
      const formData = new FormData();
      formData.append('nom', formation.nom);
      formData.append('nombreHeur', formation.nombreHeur.toString());
      formData.append('cout', formation.cout.toString());
      formData.append('objectifs', formation.objectifs);
      formData.append('programme', formation.programme);
      formData.append('categorie', formation.categorie);
      formData.append('ville', formation.ville);
      formData.append('groupe_seuil', formation.groupe_seuil.toString());
      formData.append('image', imageFile);
  
     
  
      return this.httpClient.post<Formation>(`${this.apiUrl}/formation/addFormation/image`, formData);
   
     
  }

  editFormationWithoutImage(id: number, formation: Formation): Observable<Formation> {
   
  
      return this.httpClient.put<Formation>(`${this.apiUrl}/formation/editFormationWithoutImage/${id}`, formation);
  
  
  }
editFormation(id: number, formation: Formation, imageFile: File): Observable<Formation> {
  
    const formData = new FormData();
    formData.append('nom', formation.nom);
    formData.append('nombreHeur', formation.nombreHeur.toString());
    formData.append('cout', formation.cout.toString());
    formData.append('objectifs', formation.objectifs);
    formData.append('programme', formation.programme);
    formData.append('categorie', formation.categorie);
    formData.append('ville', formation.ville);
    formData.append('image', imageFile);
  
    if (imageFile) {
      formData.append('image', imageFile);
    }


    return this.httpClient.put<Formation>(`${this.apiUrl}/formation/updateFormation/${id}`, formData);
 

}


showFormation(page: number, itemsPerPage: number, searchKey: string): Observable<Formation[]> {
  const params = new HttpParams()
    .set('pageNumber', page.toString())
    .set('pageSize', itemsPerPage.toString())
    .set('searchKey', searchKey);

  return this.httpClient.get<Formation[]>(`${this.apiUrl}/getall`, { params });
}
  public deleteFormation(id:number): Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}/formation/deleteFormation/`+id)
 
  }
   public getFormationById(id:number){
      return this.httpClient.get<Formation>(`${this.apiUrl}/formation/getFormationById/`+id)
   }
  
   
   getFormations():Observable<Formation[]>{
    return this.httpClient.get<Formation[]>(`${this.apiUrl}/getall`);
   }
    
  getByFilters(categorie: string, ville: string): Observable<Formation[]> {
    const jwtToken = this.userAuthService.getToken();

    let params = new HttpParams();
    if (categorie) {
      params = params.set('categorie', categorie);
    }
    if (ville) {
      params = params.set('ville', ville);
    }
   
    const headers = new HttpHeaders({
      'Authorization': 'Bearer ' + jwtToken
    });

    return this.httpClient.get<Formation[]>(`${this.apiUrl}/getByFilters`, { headers, params });
  }
  getCategories(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}/categories`);
  }
  
  getVilles(): Observable<string[]> {
    return this.httpClient.get<string[]>(`${this.apiUrl}/villes`);
  }

  getGroupesForFormation(formationId: number): Observable<Groupe[]> {
    const url = `${this.apiUrl}/groupes/${formationId}`;
    return this.httpClient.get<Groupe[]>(url);
  }
}
