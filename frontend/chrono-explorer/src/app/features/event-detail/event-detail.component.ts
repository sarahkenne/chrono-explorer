import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/services/event.services';
import { favoriteEvent } from '../../shared/models/favori.models';
import { CollectionComment } from '../../shared/models/comment.models';
import { categorie } from '../../shared/models/categorie.models';
import { lieu } from '../../shared/models/lieu.models';
import { thematique } from '../../shared/models/thematique.models';
import { periode } from '../../shared/models/periode.models';
import { civilisation } from '../../shared/models/civilisation.models';
import { MediaService } from '../../core/services/media-service';
import { media } from '../../shared/models/media.models';



@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {

  event: any;
  errorMessage = '';
  isFavorite: boolean = false;
  eventId!: number
  allCat: categorie[] = [];
  allLieux: lieu[] = [];
  allThematiques:thematique[] = [];
  allPeriodes: periode[] = [];
  allCivilisations: civilisation[] = [];
  commentforEvent: CollectionComment[] = [];
  medias: media[] = [];


  newComment = '';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private mediaService: MediaService
  ) { }

  ngOnInit(): void {

    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(+eventId).subscribe({
        next: (event) => {
          this.event = event;

          //recuperation des medias (archive multimedia et image principale)
          this.getMedias(event.id_evenement)

          //recup des commentaires validés
          this.loadComments(event.id_evenement)

          //verifion si l'evnement est déja dans les favoris
          this.checkIfFavorite(event.id_evenement);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l’événement', err);
          this.errorMessage = 'Impossible de charger les détails de l’événement.';
        }
      });
  
      

      this.ngOnInitFav();

    }

    this.eventService.getCategories().subscribe({
      next: (categories: categorie[]) => {
        //console.log(cat)
        this.allCat = categories;
        //console.log(this.allCat)
      }
    })

    this.eventService.getLieux().subscribe({
      next: (lieux: lieu[]) => {
        //console.log(cat)
        this.allLieux = lieux;
        console.log(this.allLieux)
      }
    });

    this.eventService.getThematiques().subscribe({
      next: (thematiques: thematique[]) => {
        //console.log(cat)
        this.allThematiques = thematiques;
        //console.log(this.allThematiques)
      }
    });

    this.eventService.getPeriodes().subscribe({
      next: (periodes: periode[]) => {
        //console.log(cat)
        this.allPeriodes = periodes;
        //console.log(this.allPeriodes)
      }
    });

    this.eventService.getCivilisations().subscribe({
      next: (civilisations: civilisation[]) => {
        //console.log(cat)
        this.allCivilisations = civilisations;
        //console.log(this.allCivilisations)
      }
    });

    

    
  }



isImage(media: media): boolean {
  const extension = media.nom_fichier.toLowerCase().slice(-4);
  return extension === '.jpg' || extension === '.png' || extension === '.jpeg';
}

isArchive(media: media): boolean {
  const extension = media.nom_fichier.toLowerCase().slice(-4);
  return extension === '.pdf' || extension === '.zip' || extension === '.rar';
}

getMedias(id: number): void {
  this.mediaService.getMediaByEvent(id).subscribe({
    next: (data) => {
      this.medias = data
      //console.log('les medias',this.medias)
    },
    error: (err) => console.error(err)
  });
}



  getCategorieNameById(id: number): string {
    const found = this.allCat.find(cat => cat.id_categorie === id);
    return found ? found.nom_categorie : 'Catégorie inconnue';
  }

   getLieuNameById(id: number): string {
    const found = this.allLieux.find(lieu => lieu.id_lieu === id);
    return found ? found.nom_lieu : 'Liex inconnue';
  }

   getThematiqueNameById(id: number): string {
    const found = this.allThematiques.find(the => the.id_thematique === id);
    return found ? found.nom_thematique : 'thematique inconnue';
  }

   getPeriodeNameById(id: number): string {
    const found = this.allPeriodes.find(per => per.id_periode === id);
    return found ? found.nom_periode : 'periode inconnue';
  }

   getCivilisationNameById(id: number): string {
    const found = this.allCivilisations.find(civ => civ.id_civilisation === id);
    return found ? found.nom_civilisation : 'civilisation inconnue';
  }


  ngOnInitFav(): void {
    const eventId = Number(this.route.snapshot.paramMap.get('id'));

    // Chargement de la liste des favoris de l'utilisateur
    this.eventService.getFavorites().subscribe({
      next: (favoris) => {

        // Vérification de si l'événement est dans les favoris
        this.isFavorite = favoris.some(f => f.id_evenement === eventId);
      },
      error: (err) => {
        console.error('Erreur récupération favoris', err);
        this.isFavorite = false;
      }
    });


  }


  toggleFavorite(): void {
    if (!this.event) return;

    if (this.isFavorite) {
      this.eventService.removeFavorite(this.event.id_evenement).subscribe({
        next: () => {
          this.isFavorite = false;
          //console.log('Favori supprimé');
        },
        error: (err) => console.error('Erreur suppression favori', err)
      });
    } else {
      this.eventService.addFavorite(this.event.id_evenement).subscribe({
        next: () => {
          this.isFavorite = true;

          //console.log('Favori ajouté');
        },
        error: (err) => console.error('Erreur ajout favori', err)
      });
    }
  }


  //qui check si l'evenement est déja en favoris et maintiens le coeur en rouge
  checkIfFavorite(eventId: number): void {
    this.eventService.getFavorites().subscribe({
      next: (favoris) => {
        this.isFavorite = favoris.some(f => f.id_evenement === eventId);
      },
      error: (err) => {
        console.error('Erreur récupération favoris', err);
        this.isFavorite = false;
      }
    });
  }

  loadComments(id: number): void {
    this.eventService.getCommentsByEvent(id).subscribe((data) => {
      this.commentforEvent = data;
      //console.log('les commentaires',this.commentforEvent)
    });
  }



  addComment(): void {
    if (this.newComment.trim() && this.event.id_evenement) {
      this.eventService.addComment(this.event.id_evenement, this.newComment).subscribe({
        next: (comment) => {
          //console.log('Commentaire ajouté:', comment);
          this.newComment = '';
        },
        error: (err) => {
          console.error('Erreur ajout commentaire', err);
        }
      });
    } else {
      console.warn("Le commentaire est vide ou eventId invalide");
      alert("Champ de commentaire vide :( ")
    }
  }




}
