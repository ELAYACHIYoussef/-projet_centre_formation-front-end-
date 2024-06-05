import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AddFormateurComponent } from './views/add-formateur/add-formateur.component';
import { AdminComponent } from './views/admin/admin.component';
import { AssistantComponent } from './views/assistant/assistant.component';
import { FormateurDetailsComponent } from './views/formateur-details/formateur-details.component';
import { FormateurComponent } from './views/formateur/formateur.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { FormationComponent } from './views/formation/formation.component';
import { ShowFormationComponent } from './views/show-formation/show-formation.component';
import { FormationdetailsComponent } from './views/formationdetails/formationdetails.component';
import { TestCompenentComponent } from './views/test-compenent/test-compenent.component';
import { InscriptionformateurexeterneComponent } from './views/inscriptionformateurexeterne/inscriptionformateurexeterne.component';
import { AjouterEntrepriseComponent } from './views/ajouter-entreprise/ajouter-entreprise.component';
import { TrainSessionComponent } from './views/train-session/train-session.component';
import { DemandeFormateurComponent } from './views/demande-formateur/demande-formateur.component';
import { YsfComponent } from './views/ysf/ysf.component';

import { EvaluationComponent } from './views/evaluation/evaluation.component';
import { NestedComponent } from './views/nested/nested.component';
import { ShowentrepriseComponent } from './views/showentreprise/showentreprise.component';
import { SubmittedComponent } from './views/submitted/submitted.component';
import { PlanificationFormateurComponent } from './views/planification-formateur/planification-formateur.component';

const routes: Routes = [

  { path: 'home', component: HomeComponent},
  { path: 'admin', component: AdminComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},
  { path: 'format', component: FormateurComponent,canActivate:[AuthGuard],data:{roles:['ROLE_FORMAT']}},
  { path: 'planifiactionformat', component: PlanificationFormateurComponent,canActivate:[AuthGuard],data:{roles:['ROLE_FORMAT']}},
  { path: 'assistant', component: AssistantComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ASSISTANT']}},   
  { path: 'addFormateur', component: AddFormateurComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},    
  { path: 'login', component: LoginComponent},    
  { path: 'allFormateur', component: FormateurDetailsComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},   
  { path: 'addformation', component: FormationComponent, canActivate:[AuthGuard], data:{roles:['ROLE_ADMIN']}},        
  { path: 'showFormation', component: ShowFormationComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN']}},
  { path: 'showEntreprise', component: ShowentrepriseComponent,canActivate:[AuthGuard],data:{roles:['ROLE_ADMIN','ROLE_ASSISTANT']}},
  { path:'formateurexeterne',component:DemandeFormateurComponent,canActivate:[AuthGuard],data:{ roles: ['ROLE_ADMIN', 'ROLE_ASSISTANT'] }},
  { path:'alreadySubmitted',component:SubmittedComponent,data:{ roles: ['ROLE_ADMIN', 'ROLE_ASSISTANT'] }},

  { 
    path: 'addEntreprise', 
    component: AjouterEntrepriseComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_ADMIN', 'ROLE_ASSISTANT'] }
  },
  { path: 'formationdetails', component: FormationdetailsComponent},
  { path: 'testTraine', component: TrainSessionComponent},
  { path: 'testCompenent', component: TestCompenentComponent},
  { path: 'ysf', component: YsfComponent},
  { path: "joinus", component:InscriptionformateurexeterneComponent},
  { path: "evaluation", component: EvaluationComponent},
  { path: "nested", component: NestedComponent},
  
  { path: '**', redirectTo: 'home'}    
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
