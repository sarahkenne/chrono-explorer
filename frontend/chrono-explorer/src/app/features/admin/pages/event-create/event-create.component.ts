import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventService } from '../../../../core/services/event.services';
import { CollectionEvent } from '../../../../shared/models/event.models';
import { CollectionEventPost } from '../../../../shared/models/eventsPost.models';
import { categorie } from '../../../../shared/models/categorie.models';
import { lieu } from '../../../../shared/models/lieu.models';
import { thematique } from '../../../../shared/models/thematique.models';
import { civilisation } from '../../../../shared/models/civilisation.models';
import { periode } from '../../../../shared/models/periode.models';
import { FormsModule, FormGroup, ReactiveFormsModule, Validators, FormControl, ValidationErrors, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { MediaService } from '../../../../core/services/media-service';
import { mediaPost } from '../../../../shared/models/mediaForPost';

@Component({
  
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  allEvents: CollectionEvent[] = [];
  allCats: categorie[] = [];
  allLieux: lieu[] = [];
  allThemats: thematique[] = [];
  allPeriodes: periode[] = [];
  allCivs: civilisation[] = [];
  editMode = false;
  editedEventId: number | null = null;
  currentEventUpdating : CollectionEventPost[] = [];
  selectedImage: File | null = null;
  selectedPImage: File | null = null;
  selectedArchives: File[] = [];
  categories: string[] = [];
  civilizations: string[] = [];
  ifImagePrincipale = '';

  formProfil = new FormGroup({
  id_eveneent: new FormControl<number | null>(null),
  titre_evenement: new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]),
  description_evenement: new FormControl<string>('', [
    Validators.required,
    Validators.minLength(3),
  ]),
  id_civilisation: new FormControl<number | null>(null, [Validators.required]),
  id_lieu: new FormControl<number | null>(null, [Validators.required]),
  id_thematique: new FormControl<number | null>(null, [Validators.required]),
  id_categorie: new FormControl<number | null>(null, [Validators.required]),
  id_periode: new FormControl<number | null>(null, [Validators.required]),
  date_debut: new FormControl<string>('', [Validators.required]),
  date_fin: new FormControl<string>('', [Validators.required]),
}, { validators: this.dateValidator });


dateValidator(group: AbstractControl): ValidationErrors | null {
  const debut = group.get('date_debut')?.value;
  const fin = group.get('date_fin')?.value;
  if (debut && fin && new Date(debut) > new Date(fin)) {
    
    return { dateInvalide: true };
  }
  return null;
}

  constructor(private eventService: EventService, private mediaService: MediaService, private router: Router) {}

  ngOnInit(): void {
//recuperation des events pour les afficher
      this.eventService.getAllEvents().subscribe({
      next: (events: CollectionEvent[]) => {
        //console.log(events)
        this.allEvents = events;
        //console.log(this.allEvents)
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });

    

    //recuperation des categories
    this.eventService.getCategories().subscribe({
      next: (cat: categorie[]) => {
        //console.log(events)
        this.allCats = cat;
        //console.log(this.allCats)
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });

     //recuperation des lieux
    this.eventService.getLieux().subscribe({
      next: (lieu: lieu[]) => {
        //console.log(events)
        this.allLieux = lieu;
        //console.log(this.allLieux)
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });

     //recuperation des civilisation
    this.eventService.getCivilisations().subscribe({
      next: (civ: civilisation[]) => {
        //console.log(events)
        this.allCivs = civ;
        //console.log(this.allCivs)
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });

     //recuperation des thematiques
    this.eventService.getThematiques().subscribe({
      next: (the: thematique[]) => {
        //console.log(events)
        this.allThemats = the;
        //console.log(this.allThemats)
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });

     //recuperation des periodes
    this.eventService.getPeriodes().subscribe({
      next: (pe: periode[]) => {
        //console.log(events)
        this.allPeriodes = pe;
        //console.log(this.allPeriodes)
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });

  }

submitEvent() {
  const formData = this.formProfil.value;

  if (this.formProfil.valid && !this.editMode && this.editedEventId == null) {
    const data: CollectionEventPost = {
      titre_evenement: formData.titre_evenement ?? '',
      description_evenement: formData.description_evenement ?? '',
      id_civilisation: Number(formData.id_civilisation) ?? 0,
      id_lieu: Number(formData.id_lieu) ?? 0,
      id_periode: Number(formData.id_periode) ?? 0,
      id_categorie: Number(formData.id_categorie) ?? 0,
      id_thematique: Number(formData.id_thematique) ?? 0,
      date_debut: formData.date_debut ?? '',
      date_fin: formData.date_fin ?? '',
    };

    this.eventService.addEvent(data).subscribe({
      next: (res: any) => {
        const eventId = res?.id_evenement; // Assurez-vous que le backend renvoie cet ID
        //console.log("Événement ajouté :", res);
        alert(`Événement " ${data.titre_evenement}" ajouté !`);
        this.formProfil.reset();

        // Upload des media (image, pdf, audio, video)
        if (this.selectedImage && eventId) {
          //console.log(eventId, this.selectedImage)
          
          this.uploadArchive(this.selectedImage, eventId, 'archive');
        }
        if(this.selectedPImage && eventId){
          this.ifImagePrincipale = 'true'

          console.log(this.selectedPImage, this.ifImagePrincipale)
          //this.uploadArchive(this.selectedPImage, eventId, 'image')
        }


        this.ngOnInit(); // recharge les listes
      },
      error: (err) => {
        console.error("Erreur lors de l'ajout :", err);
        alert("Une erreur est survenue. Veuillez réessayer.");
      }
    });

  } else {
    // Mode édition ou modification d'evenement
    const data: CollectionEvent = {
      id_evenement: Number(formData.id_eveneent) ?? 0,
      titre_evenement: formData.titre_evenement ?? '',
      description_evenement: formData.description_evenement ?? '',
      id_civilisation: Number(formData.id_civilisation) ?? 0,
      id_lieu: Number(formData.id_lieu) ?? 0,
      id_periode: Number(formData.id_periode) ?? 0,
      id_categorie: Number(formData.id_categorie) ?? 0,
      id_thematique: Number(formData.id_thematique) ?? 0,
      date_debut: formData.date_debut ?? '',
      date_fin: formData.date_fin ?? '',
    };

    this.eventService.updateEventById(Number(this.editedEventId), data).subscribe({
      next: () => {
        console.log('Événement mis à jour');

        alert("Événement mis à jour !");
        if (this.selectedImage && this.editedEventId) {
          //console.log(this.editedEventId, this.selectedImage)
          
          this.uploadArchive(this.selectedImage, this.editedEventId, 'image');
        }
        
        this.resetForm();
      },
      error: err => {
        console.error('Erreur de mise à jour', err);
        alert("Erreur de mise à jour");
      }
    });
  }
}


 resetForm(): void {
  this.formProfil.reset();
  this.editMode = false;
  this.editedEventId = null;
  this.ngOnInit(); 
}

uploadArchive(fichier: File, eventId: number, type: 'image' | 'archive'): void {
  
  const media: mediaPost = {
    description_archive: fichier.name,
    type_archive: type,
    nom_fichier: fichier,
    url: '', 
    id_evenement: eventId,
    principal: this.ifImagePrincipale,
  };

  const formData = new FormData();
  formData.append('fichier', media.nom_fichier);
  formData.append('id_evenement', media.id_evenement.toString());
  formData.append('type_archive', media.type_archive);
  formData.append('description_archive', media.description_archive);
  formData.append('principal', media.principal? 'true' : 'false');

  this.mediaService.uploadMedia(formData).subscribe({
    next: res => console.log(`Fichier ${media.description_archive} uploadé avec succès.`),
    error: err => console.error(`Erreur d’upload pour ${media.description_archive}`, err)
  });
}

//toogles des fichier chargés dans mes imput archive multimedia et image(autre que principale)
onImageSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedImage = input.files[0];
    //console.log(input)
  }
}

onImagePrincSelected(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files.length > 0) {
    this.selectedPImage = input.files[0];
    //console.log(input)
  }
}


//pour edition de mon evenement à modifier
editEvent(id: number): void {
  this.eventService.getEventById(id).subscribe({
    next: event => {
      //destucturation du event pour modifier le format de mes dates passer du format iso au format yyyy-mm-dd
      const formattedEvent = {
        ...event,
        date_debut: this.formatDateToInput(event.date_debut),
        date_fin: this.formatDateToInput(event.date_fin)
      };
      this.formProfil.patchValue(formattedEvent);
      this.editMode = true;
      this.editedEventId = id;
      
      //console.log('Formulaire pré-rempli avec l’événement', formattedEvent);
    },
    error: err => console.error('Erreur de chargement', err)
  });
}

// Méthode utilitaire pour convertir une date ISO en format "yyyy-MM-dd"
formatDateToInput(dateString: string): string {
  const date = new Date(dateString);
  const year = date.getFullYear().toString().padStart(4, '0'); // utile pour les années < 1000
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  return `${year}-${month}-${day}`;
}


 deleteEvent(id: number): void{
  const confirmation = confirm("Es-tu sûr de vouloir supprimer cet événement ?");
  if (!confirmation) return;

  this.eventService.deleteEventById(id).subscribe({
    next: () => {
      // Met à jour la liste localement sans recharger
      this.allEvents = this.allEvents.filter(e => e.id_evenement !== id);
      //console.log(`Événement ${id} supprimé avec succès.`);
    },
    error: err => {
      console.error('Erreur lors de la suppression de l’événement :', err);
      alert("Une erreur est survenue lors de la suppression.");
    }
  });
 }

 //faire correspondre les ids des liex à leurs event car api n'expose pas les lieux par id (à corriger)
 getLieuNameById(id: number): string {
    const found = this.allLieux.find(lieu => lieu.id_lieu === id);
    return found ? found.nom_lieu : 'Liex inconnue';
  }

}
