export interface Groupe {
  id: number;
  
}
export interface Formation {
  [x: string]: unknown;
  id?: number;        
  nom: string;   
  nombreHeur: number;   
  cout: number;   
  objectifs: string;   
  programme: string;   
  categorie: string;   
  ville: string;      
  date: Date;     
  groupe_seuil: number;
  photos?: string;
  
}
