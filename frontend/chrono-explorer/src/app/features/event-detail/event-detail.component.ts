import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../../core/services/event.services';
import { favoriteEvent } from '../../shared/models/favori.models';
import { CollectionComment } from '../../shared/models/comment.models';


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
  comments: Comment[] = [];
   eventId!: number
  

  newComment='';

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('id');
    if (eventId) {
      this.eventService.getEventById(+eventId).subscribe({
        next: (event) => {
          this.event = event;
          //verifion si l'evnement est déja dans les favoris
           this.checkIfFavorite(event.id_evenement);
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l’événement', err);
          this.errorMessage = 'Impossible de charger les détails de l’événement.';
        }
      });
    }
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

    this.ngOnInitFav();
  }


  toggleFavorite(): void {
    if (!this.event) return;

    if (this.isFavorite) {
      this.eventService.removeFavorite(this.event.id_evenement).subscribe({
        next: () => {
          this.isFavorite = false;
          console.log('Favori supprimé');
        },
        error: (err) => console.error('Erreur suppression favori', err)
      });
    } else {
      this.eventService.addFavorite(this.event.id_evenement).subscribe({
        next: () => {
          this.isFavorite = true;
          alert('Événement ajouté aux favoris.');
          console.log('Favori ajouté');
        },
        error: (err) => console.error('Erreur ajout favori', err)
      });
    }
  }

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

loadComments(): void {
  this.eventService.getCommentsByEvent(this.eventId).subscribe((data) => {
    this.comments = data;
  });
}



addComment(): void {
  if (this.newComment.trim() && this.event.id_evenement) {
    this.eventService.addComment(this.event.id_evenement, this.newComment).subscribe({
      next: (comment) => {
        console.log('Commentaire ajouté:', comment);
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
