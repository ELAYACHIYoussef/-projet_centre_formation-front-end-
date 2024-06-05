import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Inscription } from 'src/app/model/inscription.model';

import { InscriptionformateurexternService } from 'src/app/shared/services/inscriptionformateurextern.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-demande-formateur',
  templateUrl: './demande-formateur.component.html',
  styleUrls: ['./demande-formateur.component.css']
})
export class DemandeFormateurComponent implements OnInit {
  Formateurexterne :Inscription []=[];
  displayedColumns:String[] = ['name', 'email','comp','Actions']
  selectedFormateurId: number | null = null;
  constructor(
    private formateurexterneService: InscriptionformateurexternService,private dialog: MatDialog,
    ) { }
    ngOnInit(): void {
      this.showFormateurexerne();
     }
     public showFormateurexerne(){
       console.log("gggg");
     this.formateurexterneService.showFormateursextern().subscribe(
       (resp:Inscription[])=>{
         console.log("hhhh");
         console.log(resp)
         this.Formateurexterne = resp;
         console.log(this.Formateurexterne);
         
       },(err:HttpErrorResponse)=>{
         console.log(err);
       }
     )
     }
     onConfirmClick(selectedFormateur: any): void {
      const inscriptionId = selectedFormateur.id;
      console.log(inscriptionId)
      this.formateurexterneService.deleteAndCreateUserInfo(inscriptionId)
        .subscribe(
          (response: string) => {
            console.log('Opération réussie:', response);
            // Effectuez des opérations supplémentaires si nécessaires
          },
          (error: any) => {
            this.showFormateurexerne();
            console.error('Erreur lors de l\'opération:', error);
            // Gérez les erreurs ou effectuez des opérations supplémentaires
          }
        );
    }
    getInscriptionrById(id: number): void {
      this.formateurexterneService.getInscriptionById(id)
        .subscribe(
          (inscription: Inscription) => {
            console.log('Informations du inscription :', inscription);
            // Faire quelque chose avec les informations récupérées
          },
          (error) => {
            console.error('Erreur lors de la récupération du inscription :', error);
            // Gérer l'erreur
          }
        );
    }
  
    public deleteInscription(id:number){
      console.log("delete")
      this.formateurexterneService.deleteinscriptions(id).subscribe(
        () => {
          this.ngOnInit();
          console.log('Formateur supprimé avec succès.');
        },
        (erreur) => {
          console.error('Erreur lors de la suppression du formateur :', erreur);
        }
      );
  
    }
    ouvrirBoiteConfirmation(idFormateur: number): void {
      const dialogRef = this.dialog.open<ConfirmationDialogComponent, { message: string }>(ConfirmationDialogComponent, {
        width: '300px',
        panelClass: 'confirmation-dialog-container',
        data: { message: 'Êtes-vous sûr de vouloir supprimer ce formateur?' }
      });
  
      dialogRef.afterClosed().subscribe((result: any) => {
        if (result) {
          this.deleteInscription(idFormateur);
        }
      });
  }
}


