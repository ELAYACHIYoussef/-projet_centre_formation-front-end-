// show-formation.component.ts

import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Formation, Groupe } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/shared/services/formation.service';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ImageDialogComponent } from '../image-dialog/image-dialog.component';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { GroupeService } from 'src/app/shared/services/groupe.service';
import { GroupComponent } from '../group/group.component';

@Component({
  selector: 'app-show-formation',
  templateUrl: './show-formation.component.html',
  styleUrls: ['./show-formation.component.css']
})
export class ShowFormationComponent implements OnInit, OnDestroy {
  formationDetails: Formation[] = [];
  displayedColumns: string[] = ['id', 'nom', 'nombreHeur', 'cout', 'objectifs', 'programme', 'categorie', 'ville', 'groupes', 'Actions'];
  selectedFormationId: number | null = null;
  showTable = false;
  pageNumber = 0;
  itemsPerPage = 5;
  timer: any;
  totalItems = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private groupesSubscriptions: Subscription[] = [];

  constructor(
    private formationService: FormationService,
    private groupeService: GroupeService,
    private dialog: MatDialog,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.showFormations();
  }

  ngOnDestroy(): void {
    this.groupesSubscriptions.forEach(sub => sub.unsubscribe());
  }

  public searchByKeyWord(searchKey: string) {
    this.pageNumber = 0;
    this.formationDetails = [];

    this.timer = setTimeout(() => {
      this.showFormations(searchKey);
    }, 1500);
  }

  public showFormations(searchKey: string = "") {
    this.showTable = false;

    this.formationService.showFormation(this.pageNumber, this.itemsPerPage, searchKey).subscribe(
      (resp: any) => {
        this.formationDetails = resp;
        this.showTable = true;
        this.totalItems = resp.length;
        this.loadGroupesForFormations();
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
  }

  private loadGroupesForFormations(): void {
    this.groupesSubscriptions.forEach(sub => sub.unsubscribe());
    this.groupesSubscriptions = [];
  
    this.formationDetails.forEach((formation: Formation) => {
      if (formation.id) {
        const subscription = this.formationService.getGroupesForFormation(formation.id).subscribe(
          (groupes: Groupe[]) => {
            const formationIndex = this.formationDetails.findIndex(form => form.id === formation.id);
            if (formationIndex !== -1) {
              this.formationDetails[formationIndex]['groupes'] = groupes;
            }
          },
          (error: any) => {
            console.error(`Error fetching groupes for formation with id ${formation.id}:`, error);
          }
        );
        this.groupesSubscriptions.push(subscription);
      } else {
        console.error('Formation id is undefined or null.');
      }
    });
  }
  sendFeedback(formation: any, groupe: any): void {
    this.dialog.open(GroupComponent, {
      width: '400px',
      data: { formation, groupe },
    });
  }
  

  public editFormationDetails(id: number) {
    this.selectedFormationId = id;
    this.router.navigate(['/addformation'], { queryParams: { id: id } });
  }

  viewImage(id: number, photos: string) {
    if (id) {
      this.formationService.getFormationById(id).subscribe(
        (formation: Formation) => {
          this.dialog.open(ImageDialogComponent, {
            data: { imageUrl: photos },
            width: '50%',
          });
        },
        (error) => {
          console.error('Erreur lors de la récupération de l\'image :', error);
        }
      );
    } else {
      console.error('ID non défini.');
    }
  }

  public delete(id: number) {
    this.formationService.deleteFormation(id).subscribe(
      () => {
        this.ngOnInit();
        console.log('Formation supprimée avec succès.');
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    );
    this.ngOnInit();
  }

  ouvrirBoiteConfirmation(idFormation: number): void {
    const dialogRef = this.dialog.open<ConfirmationDialogComponent, { message: string }>(ConfirmationDialogComponent, {
      width: '300px',
      panelClass: 'confirmation-dialog-container',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cette formation?' }
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.delete(idFormation);
      }
    });
  }

  loadPage(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.showFormations();
  }

  toggleSubrow(element: any): void {
    element.showSubrow = !element.showSubrow;
  }

  get hasSubrow(): boolean {
    return this.formationDetails.some((element: any) => element.showSubrow);
  }
}
