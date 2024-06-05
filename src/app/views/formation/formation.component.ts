import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Formation } from 'src/app/model/formation.model';
import { FormationService } from 'src/app/shared/services/formation.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { FormationResolverService } from 'src/app/formation-resolver.service';

@Component({
  selector: 'app-formation',
  templateUrl: './formation.component.html',
  styleUrls: ['./formation.component.css']
})
export class FormationComponent implements OnInit {
 
  formationForm: FormGroup;
  isNewFormation= true;
  formation: Formation = {
    id: 0,
    nom: '',
    nombreHeur: 0,
    cout: 0,
    objectifs: '',
    programme: '',
    categorie: '',
    ville: '',
    date: new Date(),
    groupe_seuil: 0,
    photos: ''
  };
  selectedImage: File | null;
  editingFormationId: number | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private formationService: FormationService,
    private toastr: ToastrService,
    private route:ActivatedRoute,
    private formationResolveSerice:FormationResolverService
  ) {
    this.selectedImage = null; 
    this.formationForm = this.formBuilder.group({
      nom: ['', [Validators.required, Validators.minLength(3)]],
      nombreHeur: [0, Validators.required],
      cout: [0, Validators.required],
      objectifs: ['', Validators.required],
      programme: ['', Validators.required],
      categorie: ['', Validators.required],
      ville: ['', Validators.required],
      date: ['', Validators.required],
      groupe_seuil: [0, Validators.required],
      photos: ['', Validators.required], 
      image: [null, Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const formationId = params['id'];
      if (formationId) {
        this.loadFormationDetails(formationId);
        this.editingFormationId = formationId;
        this.isNewFormation = false;
      }
    });
  }
  loadFormationDetails(formationId: number) {
    this.formationService.getFormationById(formationId).subscribe(
      (formation) => {
        this.formationForm.patchValue(formation);
      },
      (error) => {
        console.error('Erreur lors du chargement des détails de la formation :', error);
      }
    );
  }
  
  addFormation() {
    const formateurData = this.prepareFormData(this.formationForm);
    console.log(formateurData);
    
    if (this.editingFormationId) {
      if (this.selectedImage) {
        this.formationService.editFormation(this.editingFormationId, formateurData, this.selectedImage).subscribe(
          (response) => {
            console.log('Formation modifiée avec succès :', response);
            this.toastr.success('Formation a été modifiée avec succès.', 'Modification réussie');
            this.formationForm.reset();
            this.selectedImage = null;
          },
          (error) => {
            console.error('Erreur lors de la modification de la formation :', error);
          }
        );
      } else {
        this.formationService.editFormationWithoutImage(this.editingFormationId, formateurData).subscribe(
          (response) => {
            console.log('Formation modifiée avec succès :', response);
            this.toastr.success('Formation a été modifiée avec succès.', 'Modification réussie');
            this.formationForm.reset();
          },
          (error) => {
            console.error('Erreur lors de la modification de la formation :', error);
          }
        );
      }
    } else {
      if (this.selectedImage) {
        console.log("ysf rrrrrr");
        
        this.formationService.addFormation(formateurData, this.selectedImage).subscribe(
          (response) => {

            console.log('ysf a ajoute Formation ajoutée avec succès :', response);
            this.formationForm.reset();
            this.toastr.success('Formation a été ajoutée avec succès.', 'Ajout réussi');
          },
          (error) => {
            console.error('Erreur lors de l\'ajout de la formation :', error);
          }
        );
      } else {
        console.error("Image non sélectionnée.");
      }
    }
  }
  

  prepareFormData(formationBuilder: any): Formation {
    this.formation.nom = formationBuilder.value.nom;
    this.formation.nombreHeur = formationBuilder.value.nombreHeur;
    this.formation.cout = formationBuilder.value.cout;
    this.formation.objectifs = formationBuilder.value.objectifs;
    this.formation.programme = formationBuilder.value.programme;
    this.formation.categorie = formationBuilder.value.categorie;
    this.formation.ville = formationBuilder.value.ville;
    this.formation.groupe_seuil = formationBuilder.value.groupe_seuil;
    this.formation.date = formationBuilder.value.date;

    return { ...this.formation };
  }

  onImageSelected(event: any) {
    console.log('Image sélectionnée !');
    const file: File = event.target.files[0];
    this.selectedImage = file;
  }
  

}
