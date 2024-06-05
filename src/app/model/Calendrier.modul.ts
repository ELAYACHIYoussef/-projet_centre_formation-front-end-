import { Entreprise } from './Entreprise.modul';
import { Formateur } from './Formateur.model';
import { Formation } from './formation.model';
import { Groupe } from './Group.model';
import { User } from './user.model';

export interface Calendrier {

  id?: number;
  datedebut: Date;
  datefin: Date;
  title: string;
  formation: Formation;
  formateur: Formateur | User;
  entreprise?: Entreprise | null;
  groupe?: Groupe | null;
  entrepriseId?: number | null;
  groupeId?: number | null;
}
