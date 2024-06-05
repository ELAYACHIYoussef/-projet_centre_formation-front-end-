import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Inscription } from 'src/app/model/inscription.model';
import { InscriptionformateurexternService } from 'src/app/shared/services/inscriptionformateurextern.service';
import { MatChipEditedEvent, MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-inscriptionformateurexterne',
  templateUrl: './inscriptionformateurexeterne.component.html',
  styleUrls: ['./inscriptionformateurexeterne.component.css']
})
export class InscriptionformateurexeterneComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  addMot(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
  
    // Add our mot_cle
    if (value) {
      const motsClesControl = this.inscriptionFormateur?.get('mots_cles');
      if (motsClesControl) {
        const currentValue = motsClesControl.value || '';
        const updatedValue = currentValue ? `${currentValue},${value}` : value;
        motsClesControl.setValue(updatedValue);
      }
    }
  
    // Clear the input value
    if (event.chipInput) {
      event.chipInput.clear();
    }
  }
  editMot(mot: string, event: MatChipEditedEvent): void {
    const value = event.value.trim();
  
    // Remove mot_cle if it no longer has a name
    if (!value) {
      this.removeMot(mot);
      return;
    }
  
    // Edit existing mot_cle
    const motsClesControl = this.inscriptionFormateur?.get('mots_cles');
    if (motsClesControl) {
      const currentValue = motsClesControl.value || '';
      const updatedValue = currentValue.replace(mot, value);
      motsClesControl.setValue(updatedValue);
    }
  }
  
  formateurexterne: Inscription = {
    name: '',
    email: '',
    mots_cles: '',
    date: new Date()
  };
  inscriptionFormateur: FormGroup;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private inscriptionforservice: InscriptionformateurexternService,
   
  ) {
    this.inscriptionFormateur = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      mots_cles: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  ngOnInit(): void {
    const motsClesControl = this.inscriptionFormateur.get('mots_cles');

    if (motsClesControl) {
      motsClesControl.setValue('');
    }
  }
  removeMot(mot: string): void {
    const motsClesControl = this.inscriptionFormateur?.get('mots_cles');

    if (motsClesControl) {
      const currentValue = motsClesControl.value;
      const updatedValue = currentValue.replace(mot + ',', '').replace(mot, '');
      motsClesControl.setValue(updatedValue);
    }
  }
  
  inscriotionformateurexterne(): void {
    if (this.inscriptionFormateur.valid) {

      const { name, email, mots_cles } = this.inscriptionFormateur.value;
      this.inscriptionforservice.inscriptionFormateurExtern(name, email, mots_cles)
        .subscribe(
          (result) => {
            // Traitement du résultat si nécessaire
            console.log('Inscription réussie:', result);
            this.toastr.success('Inscription réussie', 'Inscription réussie');
            // Fermer la boîte de dialogue ou effectuer une autre action après inscription réussie
           
          },
          (error) => {
            // Traitement de l'erreur si nécessaire
            console.error('Erreur lors de l\'inscription:', error);
          }
        );
    }
  }

 
}
