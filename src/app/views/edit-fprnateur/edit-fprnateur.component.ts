import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-fprnateur',
  templateUrl: './edit-fprnateur.component.html',
  styleUrls: ['./edit-fprnateur.component.css']
})
export class EditFprnateurComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<EditFprnateurComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) {
    this.form = this.formBuilder.group({
      id: [data.id, Validators.required],
      name: [data.name, Validators.required],
      email: [data.email, [Validators.required, Validators.email]],
      // Ajoutez d'autres champs si nécessaire
    });
  }

  save(): void {
    if (this.form.valid) {
      // Émettez les données du formulaire lorsque le bouton "Save" est cliqué
      this.dialogRef.close(this.form.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    // La méthode ngOnInit est appelée automatiquement lors de l'initialisation du composant
  }
}
