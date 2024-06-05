import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription-form.component.html',
  styleUrls: ['./inscription-form.component.css']
})
export class InscriptionFormComponent implements OnInit {
  inscriptionForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<InscriptionFormComponent>,
    private fb: FormBuilder
  ) {
    this.inscriptionForm = this.fb.group({
      nom: ['', [Validators.required, Validators.minLength(2)]],
      prenom: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      ville: ['', [Validators.required, Validators.minLength(2)]],
      telephone: ['', [Validators.required, Validators.minLength(2)]],
      dateNaissance: [null, Validators.required],
    });
  }
  ngOnInit(): void {}
  submitInscription(): void {
    console.log("valeur recuprer de la formulaire ",this.inscriptionForm.value);
    const formValues = this.inscriptionForm.value;

    
    this.dialogRef.close(formValues);
  }
  cancel(): void {
    this.dialogRef.close();
  }

}
