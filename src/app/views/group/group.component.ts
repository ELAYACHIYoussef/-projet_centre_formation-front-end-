import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Individus } from 'src/app/model/Individus.model';
import { GroupeService } from 'src/app/shared/services/groupe.service';

@Component({
  selector: 'app-group',
  templateUrl: 'group.component.html',
  styleUrls: ['group.component.css']
})
export class GroupComponent implements OnInit {
  individusList: Individus[] = [];
  popupWidth!: number;
  selectedGroupe: any = null;
  selectedRowIndex: number = -1;
detailsVisible: boolean = false;

showDetails(index: number): void {
  this.selectedRowIndex = index;
  this.detailsVisible = true;
}

closeDetails(): void {
  this.detailsVisible = false;
  this.selectedRowIndex = -1;
}


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private groupeService: GroupeService,
    private toastr: ToastrService,
    public dialogRef: MatDialogRef<GroupComponent>
  ) {}
  ngOnInit(): void {
    console.log("boite ouverte");
   
  }


  closePopup(): void {
    this.dialogRef.close();
  }
  

  fetchInscriptions(groupe: any): void {
    const groupeId = groupe.id;

    this.groupeService.getInscriptionEmailsForFormation(groupeId)
      .subscribe(
        (individus: Individus[]) => {
          this.individusList = individus;
          console.log('Liste des individus récupérée avec succès', this.individusList);
        },
        (error) => {
          console.error('Erreur lors de la récupération des individus du groupe', error);
        }
      );
  }
  sendFeedback(formation: any, groupe: any): void {
    this.groupeService.sendFeedbackEmail(groupe.id).subscribe(
      (response) => {
        console.log('Feedback envoyé avec succès', response);
        
      },
      (error) => {
        console.error('Error sending feedback:', error);
        this.toastr.success('Feedback envoyé avec succès.', 'Envoie réussie');
      }
    );
  }

}
