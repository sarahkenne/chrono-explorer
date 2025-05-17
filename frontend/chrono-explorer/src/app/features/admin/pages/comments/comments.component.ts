import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  // Simulation de données mockées
  private comments = [
    {
      id: 1,
      eventId: 101,
      eventTitle: 'Bataille de Gergovie',
      content: 'Super intéressant ! J’aimerais en savoir plus.',
      status: 'pending'
    },
    {
      id: 2,
      eventId: 102,
      eventTitle: 'Chute de Rome',
      content: 'L’événement est fascinant, merci !',
      status: 'pending'
    }
  ];

  getPendingComments(): Observable<any[]> {
    // Plus tard, ici un appel HTTP
    return of(this.comments.filter(c => c.status === 'pending'));
  }

  validateComment(id: number): Observable<boolean> {
    const comment = this.comments.find(c => c.id === id);
    if (comment) comment.status = 'validated';
    return of(true);
  }

  rejectComment(id: number): Observable<boolean> {
    const comment = this.comments.find(c => c.id === id);
    if (comment) comment.status = 'rejected';
    return of(true);
  }
}
