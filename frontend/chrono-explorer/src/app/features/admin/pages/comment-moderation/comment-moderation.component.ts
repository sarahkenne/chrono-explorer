import { Component, OnInit } from '@angular/core';
import { CommentService } from '../comments/comments.component'; 
import { CommonModule } from '@angular/common';
import { EventService } from '../../../../core/services/event.services';
import { CollectionComment } from '../../../../shared/models/comment.models';
import { CollectionEvent } from '../../../../shared/models/event.models';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../core/services/auth-services';

@Component({
  selector: 'app-comment-moderation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-moderation.component.html',
  styleUrls: ['./comment-moderation.component.css'],
})
export class CommentModerationComponent implements OnInit {
  pendingCommentaires: CollectionComment[] = [];
  isLoading = true;
  eventTitles: Map<number, any> = new Map();
   allEvents: CollectionEvent[] = [];

 constructor(private commentaireService: EventService,) {}

  ngOnInit(): void {
    this.loadCommentaires();  
  }

  loadCommentaires(): void {
  this.isLoading = true;
  this.commentaireService.getPendingCommentaires().subscribe({
    next: (data) => {
      this.pendingCommentaires = data;
      this.isLoading = false;

      // Charger tous les titres d’événements
      this.pendingCommentaires.forEach(comment => {
        const eventId = comment.id_evenement;
        
        if (!this.eventTitles.has(eventId)) {
          this.commentaireService.getEventById(eventId).subscribe({
            next: (event) => {
              this.eventTitles.set(eventId, event.titre_evenement);
              

            },
            error: (err) => {
              console.error(`Erreur pour l’événement ${eventId}`, err);
              this.eventTitles.set(eventId, 'Événement inconnu');
            }
          });
        }
      });
    },
    error: (err) => {
      console.error(err);
      this.isLoading = false;
    }
  });
}

leadEvenement(){
  
}

modifierEvenement(id: number){
return;
}

supprimerEvenement(id: number){
return;
}


getTitre(eventId: number): string {
  return this.eventTitles.get(eventId) || 'Chargement...';
}


  valider(id: number): void {
    this.commentaireService.validerCommentaire(id).subscribe(() => {
      this.loadCommentaires();
    });
  }

  refuser(id: number): void {
    this.commentaireService.refuserCommentaire(id).subscribe(() => {
      this.loadCommentaires();
    });
}
}
