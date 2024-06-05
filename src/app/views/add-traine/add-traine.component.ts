import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Calendrier } from 'src/app/model/Calendrier.modul';
import { Entreprise } from 'src/app/model/Entreprise.modul';
import { Formateur } from 'src/app/model/Formateur.model';
import { Formation } from 'src/app/model/formation.model';
import { Groupe } from 'src/app/model/Group.model';
import { CalendrierService } from 'src/app/shared/services/calendrier.service';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { FormateurService } from 'src/app/shared/services/formateur.service';
import { FormationService } from 'src/app/shared/services/formation.service';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-add-traine',
  templateUrl: './add-traine.component.html',
  styleUrls: ['./add-traine.component.css']
})
export class AddTraineComponent implements OnInit {
  form: FormGroup;
  formations: Formation[] = [];
  formateurs: Formateur[] = [];
  entreprises: Entreprise[] = [];
  groupes: Groupe[] = [];
  title: any;
  selectedPeriod: any;
  selectedOption: 'entreprise' | 'groupe' = 'entreprise'; // Default to 'entreprise'
  eventId: number | undefined;

  constructor(
    private dialogRef: MatDialogRef<AddTraineComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private formationService: FormationService,
    private formateurService: FormateurService,
    private entrepriseService: EntrepriseService,
    private groupeService: GroupeService,
    private calendrierService: CalendrierService
  ) {
    this.selectedPeriod = data;
    this.eventId = data?.eventId;
    console.log("anaaaaaa honaaaa"+this.eventId );
    
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      formationName: ['', Validators.required],
      formateurName: ['', Validators.required],
      entrepriseName: [''],
      groupeId: [''],
      selectedOptionValue: ['entreprise']
    });
  }

  ngOnInit(): void {
    console.log("data is "+this.data);
    
    this.loadFormations();
    this.loadFormateurs();
    this.loadEntreprises();
    
    console.log("ID :" + this.eventId)
    if (this.data.id) {
      this.loadEventData(this.data.id);
    }
    this.form.get('formationName')?.valueChanges.subscribe((formationId: number) => {
      if (formationId) {
        this.loadGroupes(formationId);
      }
    });
  }

  loadEventData(eventId: number): void {
    this.calendrierService.getEventById(eventId).subscribe(
      (eventData: any) => {
        console.log("#####################", eventData);
        this.data = eventData ;
        this.form.patchValue({
          title: eventData.title,
          formationName: eventData.formationId??null,
          entrepriseName: eventData.entrepriseId??null,
          groupeId: eventData.groupeId??null,
          formateurName: eventData.formateurId??null,
          selectedOptionValue: eventData.entreprise ? 'entreprise' : 'groupe'
        });
        console.log(eventData);
  
      },
      (error) => {
        console.error('Erreur lors du chargement des données de l\'événement :', error);
      }
    );
  }

  loadFormations(): void {
    this.formationService.getFormations().subscribe(
      (formations: Formation[]) => {
        this.formations = formations;
      },
      (error) => {
        console.error('Erreur lors du chargement des formations :', error);
      }
    );
  }

  loadFormateurs(): void {
    this.formateurService.showFormateurs().subscribe(
      (formateurs: Formateur[]) => {
        this.formateurs = formateurs;
      },
      (error) => {
        console.error('Erreur lors du chargement des formateurs :', error);
      }
    );
  }

  loadEntreprises(): void {
    this.entrepriseService.getEntreprises().subscribe(
      (entreprises: Entreprise[]) => {
        this.entreprises = entreprises;
      },
      (error) => {
        console.error('Erreur lors du chargement des entreprises :', error);
      }
    );
  }
  loadGroupes(formationId: number): void {
    this.formationService.getGroupesForFormation(formationId).subscribe(
      (groupes: Groupe[]) => {
        this.groupes = groupes;
      },
      (error) => {
        console.error('Erreur lors du chargement des groupes :', error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const selectedFormation = this.formations.find(form => form.id === this.form.get('formationName')?.value);
      const selectedFormateur = this.formateurs.find(formateur => formateur.id === this.form.get('formateurName')?.value);
      const selectedEntreprise = this.entreprises.find(entreprise => entreprise.id === this.form.get('entrepriseName')?.value);
      const selectedGroupe = this.groupes.find(groupe => groupe.id === this.form.get('groupeId')?.value);
      const selectedOptionValue = this.form.get('selectedOptionValue')?.value;

      if (selectedFormation && selectedFormateur && selectedOptionValue !== undefined) {
        const newCalendrier: Calendrier = {
          datedebut: this.selectedPeriod.start,
          datefin: this.selectedPeriod.end,
          title: this.form.get('title')?.value,
          formation: selectedFormation,
          formateur: selectedFormateur,
          entrepriseId: selectedOptionValue === 'entreprise' ? selectedEntreprise!.id || null : null,
          groupeId: selectedOptionValue === 'groupe' ? selectedGroupe!.id || null : null
        };

        if (this.data.title) {
          console.log("updating ....");
          let data = {
            id: this.data.id,
            datedebut: newCalendrier.datedebut,
            datefin: newCalendrier.datefin,
            title: newCalendrier.title ,
            formationId: newCalendrier.formation.id,
            formateurId: newCalendrier.formateur.id,
            entrepriseId: newCalendrier.entrepriseId,
            groupeId: newCalendrier.groupeId
        }
          this.calendrierService.updateEvent(data, selectedOptionValue).subscribe(
            (response: Calendrier) => {
              console.log('Calendrier mis à jour avec succès :', response);
            },
            (error) => {
              console.error('Erreur lors de la mise à jour du calendrier :', error);
            },
            () => {
              this.dialogRef.close();
            }
          );
        } else {
          console.log("adding  ....");

          if (selectedFormation.id && selectedFormateur.id) {
            this.calendrierService.addTraine(newCalendrier, selectedFormation.id, selectedFormateur.id, selectedOptionValue).subscribe(
              (response: Calendrier) => {
                console.log('Calendrier ajouté avec succès :', response);
              },
              (error) => {
                console.error('Erreur lors de l\'ajout du calendrier :', error);
              },
              () => {
                this.dialogRef.close();
              }
            );
          } else {
            console.error('ID manquant pour la création du calendrier');
          }
        }
      } else {
        console.error('Sélection manquante pour la création du calendrier');
      }
    } else {
      console.error('Formulaire invalide');
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
