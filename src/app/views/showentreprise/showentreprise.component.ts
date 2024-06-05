import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { Entreprise } from 'src/app/model/Entreprise.modul';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-showentreprise',
  templateUrl: './showentreprise.component.html',
  styleUrls: ['./showentreprise.component.css']
})
export class ShowentrepriseComponent {
  entrepriseDetails: Entreprise[] = [];
  displayedColumns: string[] = ['id', 'name', 'address', 'phoneNumber', 'email','url', 'Actions'];
  selectedFormationId: number | null = null;
  showTable = false;
  showMoreFormation = false;
  pageNumber = 0;
  timer:any;
  totalItems = 0;
  itemsPerPage = 5; 
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  constructor(
    private entrepriseService: EntrepriseService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    console.log("ysf");
    
    this.showEntreprise();
  }

  public searchByKeyWord(searchKey: string) {
    
    console.log(searchKey);
    this.pageNumber = 0;
    this.entrepriseDetails = [];

    this.timer = setTimeout(() => {
      console.log('espero 3')
      this.showEntreprise(searchKey);
    },1500);
   
  }

  public showEntreprise(searchKey: string = "") {
    console.log("starting...");
    this.entrepriseService.getEntreprises().subscribe(
      (resp: any) => {
        console.log("loading entrepride");
        this.entrepriseDetails = resp;  
        this.showTable = true;
        this.totalItems = resp.length; 
        console.log(this.entrepriseDetails);
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  
  }
  public delete(id: number) {
    console.log('starting deleting ...');
    console.log('Testing Mar1 ...');

    this.entrepriseService.deleteEntreprise(id).subscribe(
      () => {
        console.log('deleting the formation');
        this.ngOnInit();
        console.log('Formation supprimé avec succès.');
        console.log(this.entrepriseDetails);
      }, (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.showEntreprise();
  }

  ouvrirBoiteConfirmation(idFormation: number): void {
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, { message: string }>(ConfirmationDialogComponent, {
      width: '300px',
      panelClass: 'confirmation-dialog-container',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cette entreprise?' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.delete(idFormation);

      }
    });
  }


  public editFormationDetails(id: number) {
    this.selectedFormationId = id;
    this.router.navigate(['/addEntreprise'], { queryParams: { id: id } });
  }
  loadPage(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.showEntreprise();
  }
 
 

 

}


