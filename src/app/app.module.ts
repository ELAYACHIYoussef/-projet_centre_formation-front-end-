import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgrupaMaterialModule } from './material/agrupa-material.module';
import { AdminComponent } from './views/admin/admin.component';
import { FormateurComponent } from './views/formateur/formateur.component';
import { AssistantComponent } from './views/assistant/assistant.component';
import { AddFormateurComponent } from './views/add-formateur/add-formateur.component';
import { ToastrModule } from 'ngx-toastr';
import { FormateurDetailsComponent } from './views/formateur-details/formateur-details.component';
import { ConfirmationDialogComponent } from './views/confirmation-dialog/confirmation-dialog.component';
import { FormationComponent } from './views/formation/formation.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './auth.guard';
import { AuthInterceptor } from './auth.interceptor';
import { UserService } from './shared/services/user.service';
import { MatIconModule } from '@angular/material/icon';
import { ShowFormationComponent } from './views/show-formation/show-formation.component';
import { InscriptionFormComponent } from './views/inscription-form/inscription-form.component';
import { InscriptionformateurexeterneComponent } from './views/inscriptionformateurexeterne/inscriptionformateurexeterne.component';
import { FormationdetailsComponent } from './views/formationdetails/formationdetails.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TestCompenentComponent } from './views/test-compenent/test-compenent.component';
import { AjouterEntrepriseComponent } from './views/ajouter-entreprise/ajouter-entreprise.component';
import { MatChipsModule } from '@angular/material/chips';
import { DemandeFormateurComponent } from './views/demande-formateur/demande-formateur.component';
import { FullCalendarModule } from '@fullcalendar/angular'; 
import { CommonModule } from '@angular/common';
import { TrainSessionComponent } from './views/train-session/train-session.component';
import { AddTraineComponent } from './views/add-traine/add-traine.component';
import { FooterComponent } from './views/footer/footer.component';
import { YsfComponent } from './views/ysf/ysf.component';
import { MatSliderModule } from '@angular/material/slider';
import { EvaluationComponent } from './views/evaluation/evaluation.component';
import { NestedComponent } from './views/nested/nested.component';
import { ShowentrepriseComponent } from './views/showentreprise/showentreprise.component';
import { SubmittedComponent } from './views/submitted/submitted.component';
import { GroupComponent } from './views/group/group.component';
import { PlanificationFormateurComponent } from './views/planification-formateur/planification-formateur.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    AdminComponent,
    FormateurComponent,
    AssistantComponent,
    AddFormateurComponent,
    FormateurDetailsComponent,
    ConfirmationDialogComponent,
    FormationComponent,
    ShowFormationComponent,
    InscriptionFormComponent,
    InscriptionformateurexeterneComponent,
    FormationdetailsComponent,
    TestCompenentComponent,
    AjouterEntrepriseComponent,
    TrainSessionComponent,
    DemandeFormateurComponent,
    AddTraineComponent,    
    FooterComponent,
    EvaluationComponent,
    NestedComponent,
    EvaluationComponent,
    ShowentrepriseComponent,
    SubmittedComponent,
    GroupComponent,
    PlanificationFormateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatButtonModule,
    MatSliderModule,
    MatInputModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AgrupaMaterialModule,
    MatIconModule,
    MatChipsModule,
  
    CommonModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    MatPaginatorModule,
    FullCalendarModule,
    
  ],
  providers: [AuthGuard,{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
