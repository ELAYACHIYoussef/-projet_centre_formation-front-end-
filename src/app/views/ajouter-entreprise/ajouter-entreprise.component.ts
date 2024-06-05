import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Entreprise } from 'src/app/model/Entreprise.modul';
import { EntrepriseService } from 'src/app/shared/services/entreprise.service';


@Component({
  selector: 'app-ajouter-entreprise',
  templateUrl: './ajouter-entreprise.component.html',
  styleUrls: ['./ajouter-entreprise.component.css']
})
export class AjouterEntrepriseComponent {
  entrepriseForm: FormGroup;
  isNewEntreprise= true;
  entreprise: Entreprise = {
    name: '',
    address: '',
    phoneNumber: '',
    email: '',
    url: ''
  };
  editingEntrepriseId: number | null = null;
  constructor(
    private formBuilder: FormBuilder,
    private entrepriseService: EntrepriseService,
    private toastr: ToastrService,
    private route:ActivatedRoute,
  ) {
    this.entrepriseForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      url: ['', Validators.required]
    });
  }
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const formationId = params['id'];
      if (formationId) {
        this.loadEntrepriseDetails(formationId);
        this.editingEntrepriseId = formationId;
        this.isNewEntreprise = false;
      }
    });
  }
  loadEntrepriseDetails(formationId: number) {
    this.entrepriseService.getEntrepriseById(formationId).subscribe(
      (formation) => {
        this.entrepriseForm.patchValue(formation);
      },
      (error) => {
        console.error('Erreur lors du chargement des détails de la formation :', error);
      }
    );
  }
  addEntreprise() {
    const entrepriseData = this.prepareFormData(this.entrepriseForm);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Proxy': 'http://localhost:8080'  
    });
    if (this.editingEntrepriseId) {
         console.log(entrepriseData)
        this.entrepriseService.updateEntreprise(this.editingEntrepriseId, entrepriseData).subscribe(
          (response) => {
            
            console.log('Formation modifiée avec succès :', response);
            this.toastr.success('Entreprise a été modifiée avec succès.', 'Modification réussie');
            this.entrepriseForm.reset();
          },
          (error) => {
            console.error('Erreur lors de la modification de la formation :', error);
          }
        );
      }else {
    this.entrepriseService.addEntreprise(entrepriseData, headers).subscribe(
      (response: Entreprise) => {
        console.log(response);
        this.entrepriseForm.reset();
        this.toastr.success('Le entreprise a été ajouté avec succès.', 'Ajout réussi');
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
      }
  }

  prepareFormData(entrepriseBuilder: any): Entreprise {
    this.entreprise.name = entrepriseBuilder.value.name;
    this.entreprise.address = entrepriseBuilder.value.address;
    this.entreprise.email = entrepriseBuilder.value.email;
    this.entreprise.phoneNumber = entrepriseBuilder.value.phoneNumber;
    this.entreprise.url = entrepriseBuilder.value.url;
    return this.entreprise;
  }
}
