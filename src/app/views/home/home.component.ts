import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Formation } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/shared/services/formation.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Individus } from 'src/app/model/Individus.model';
import { IndividusService } from 'src/app/shared/services/individuals.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CalendrierService } from 'src/app/shared/services/calendrier.service';
import { FormateurService } from 'src/app/shared/services/formateur.service';
import { Formateur } from 'src/app/model/Formateur.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css',
    '../../../assets/css/style.css',
    '../../../assets/css/bootstrap.min.css',
    '../../../assets/css/all.min.css'
  ]
})
export class HomeComponent implements OnInit {
  FormateurDetails :Formateur []=[];
  formations: Formation[] = [];
  selectedFormation: Formation | null = null;
  filteredFormations: Formation[] = [];
  individus:Individus[]=[];
  totalIndividu: number=0;
  search: string = '';
  filterNom: string = '';
  filterVille: string = '';
  filterDate: Date | null = null;
  filterForm: FormGroup;
  villes: string[] = [];
  categories: string[] = [];
  itemsPerPage = 5;
  pageNumber = 0;
  totalItems = 0;
  showAllCourses: boolean = false;
  nombreFormationsPlanifiees: number = 0;
  nomFormateur:string[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private formationService: FormationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private individusService: IndividusService,
    private calendarService: CalendrierService,
    private formateurService:FormateurService

    
  ) {
    this.filterForm = this.formBuilder.group({
      categorie: [''],
      ville: ['']
    });
  }

  ngOnInit(): void {
    this.fetchFormations();
    this.fetchCategoriesAndVilles();
    this.fetchFormationsPlanifiees();
    this.getIndividus();
    this.getFormateurNom();
  }

  fetchFormations(): void {
    this.formationService.getFormations().subscribe(
      (formations: Formation[]) => {
        console.log(formations);
        this.formations = formations;
        this.filteredFormations = formations;
        this.totalItems = formations.length;
        
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des formations', error);
      }
    );
  }

  fetchCategoriesAndVilles(): void {
    this.formationService.getCategories().subscribe(
      (categories: string[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des catégories', error);
      }
    );
    this.formationService.getVilles().subscribe(
      (villes: string[]) => {
        this.villes = villes;
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des villes', error);
      }
    );
  }

  showDetails(formation: Formation): void {
    this.selectedFormation = formation;
  }

  closeDetails(): void {
    this.selectedFormation = null;
  }

  filterFormations(): void {
    const categorie = this.filterForm.get('categorie')?.value || '';
    const ville = this.filterForm.get('ville')?.value || '';
    this.formationService.getByFilters(categorie, ville).subscribe(
      (formations: Formation[]) => {
        this.filteredFormations = formations;
        this.totalItems = formations.length; 
        console.log("ana hnaaaa"+this.totalItems);
        
      },
      (error: any) => {
        console.error('Erreur lors de la récupération des formations filtrées', error);
      }
    );
  }

  navigateToDetailsPage(formation: Formation): void {
    if (formation && formation.id !== undefined) {
      this.router.navigate(['/formation-details', formation.id]);
    }
  }

  loadPage(event: PageEvent): void {
    this.pageNumber = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.fetchFormations();
  }

  toggleShowAllCourses() {
    const container = document.querySelector('.formation-container');
    console.log(container);
    container?.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
  }

  getIndividus(){
    console.log("ana hnaaaaaaaaaaa");
    this.individusService.getIndividus().subscribe(
      (resp)=>{
        console.log(resp);
        this.totalIndividu=resp.length
      },
      (err: HttpErrorResponse) => {
        console.log(err);
      }
    )
  }


  fetchFormationsPlanifiees(): void {
    this.formationService.getFormations().subscribe(
      (event)=>{
        this.nombreFormationsPlanifiees=event.length;
      },
       (error) => {
        console.error('Erreur lors du chargement des événements :', error);
        
      }
    )
  }
  
  getFormateurNom():void{
    this.formateurService.getFormateurByNom().subscribe(
      (resp)=>{
      this.nomFormateur=resp.map((formateur:Formateur)=>formateur.name)
      console.log("les nom             "+this.nomFormateur);
      
      },
      (error) => {
        console.error('Erreur lors du chargement des événements :', error);
        
      }
    )
  }
  
  
  
  
}
