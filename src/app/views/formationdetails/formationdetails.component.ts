import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InscriptionFormComponent } from '../inscription-form/inscription-form.component';
import { MatDialog } from '@angular/material/dialog';
import { Individus } from 'src/app/model/Individus.model';
import { IndividusService } from 'src/app/shared/services/individuals.service';
import { InscriptionformateurexeterneComponent } from '../inscriptionformateurexeterne/inscriptionformateurexeterne.component';
import { FormateurService } from 'src/app/shared/services/formateur.service';
import { InscriptionformateurexternService } from 'src/app/shared/services/inscriptionformateurextern.service';
import { Inscription } from 'src/app/model/inscription.model';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-formationdetails',
  templateUrl: './formationdetails.component.html',
  styleUrls: ['./formationdetails.component.css']
})
export class FormationdetailsComponent implements OnInit {
  formationId!: number;
  nom: string | undefined;
  nombreHeur: number | undefined;
  cout: number | undefined;
  objectifs: string | undefined;
  programme: string | undefined;
  categorie?: string;
  ville?: string;
  date?: Date;
  photos?: string;
  showInscriptionForm: boolean = false;
  inscriptionFormateur:FormGroup;
  inscriptionForm: FormGroup;
  individu: Individus = {
    nom: '',
    prenom: '',
    dateNaissance: new Date(),
    ville: '',
    email: '',
    telephone: '',
  };
  formateurexterne: Inscription = {
    name: '',
    email: '',
    mots_cles: '',
    date:new Date()

  };

constructor(private inscriptionforservice: InscriptionformateurexternService,private route: ActivatedRoute, private individusService: IndividusService,private fb: FormBuilder,private dialog: MatDialog, private toastr: ToastrService,) {
    this.inscriptionForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      ville: ['', Validators.required],
      telephone: ['', Validators.required],
      dateNaissance: [null, Validators.required],
    });
    this.inscriptionFormateur = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mots_cles: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.formationId = params['id'];
      this.nombreHeur=params['nombreHeur'];
      this.ville=params["ville"];
      this.date=params['date'];
      this.objectifs= params['objectifs'];
      this.categorie=params['categorie'];
      this.cout=params['cout'];
      this.programme=params['programme'];
      this.nom=params['nom'];
    });
  }

  toggleInscriptionForm(): void {
    this.showInscriptionForm = !this.showInscriptionForm;
  }

  
  inscription(formationId: number): void {
    console.log('Date de naissance avant l\'appel au service:', this.individu);
    const seuilTotalIndividusParGroupe = 3;
    this.individusService.inscription(this.individu, formationId).subscribe(
      (result) => {
        // Traitement du résultat si nécessaire
        console.log('Inscription réussie:', result);
        this.toastr.success('Félicitations ! Vous avez été avec succès inscrit(e) dans notre formation.', 'Inscription réussie');
      },
      (error) => {
        // Traitement de l'erreur si nécessaire
        console.error('Erreur lors de l\'inscription:', error);
      }
    );
  }
  openInscriptionForm(formationId: number): void {
    const dialogRef = this.dialog.open(InscriptionFormComponent, {
      width: '400px', // Définissez la largeur de la popup selon vos besoins
    });
  
    // Vous pouvez ajouter des gestionnaires d'événements ici, par exemple, pour traiter le résultat après la fermeture de la popup.
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.individu = result;
        this.inscription(formationId);
        
      }
    });
}
inscriotionformateurexterne(formationId:number):void {

  const formateurFormValues = this.formateurexterne; 
  console.log("donner envoyer",formateurFormValues)
  const { name, email, mots_cles } = formateurFormValues;
  this.inscriptionforservice.inscriptionFormateurExtern(name, email, mots_cles)
      .subscribe(
        (result) => {
          // Traitement du résultat si nécessaire
          console.log('Inscription réussie:', result);
        },
        (error) => {
          // Traitement de l'erreur si nécessaire
          console.error('Erreur lors de l\'inscription:', error);
        }
      );
}
openInscriptionFormateur(formationId: number): void {
  const dialogRef = this.dialog.open(InscriptionformateurexeterneComponent, {
    width: '400px', 
  });
  dialogRef.afterClosed().subscribe((result: any) => {
    if (result) {
      this.formateurexterne = result;
      console.log("donner ici",this.formateurexterne);
      this.inscriotionformateurexterne(formationId);
      
    }
  });
}
}