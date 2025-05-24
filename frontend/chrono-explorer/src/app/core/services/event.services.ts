import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CollectionEvent } from '../../shared/models/event.models';
import { categorie } from '../../shared/models/categorie.models';
import { lieu } from '../../shared/models/lieu.models';
import { civilisation } from '../../shared/models/civilisation.models';
import { thematique } from '../../shared/models/thematique.models';
import { periode } from '../../shared/models/periode.models';
import { CollectionComment } from '../../shared/models/comment.models';
import { CollectionEventPost } from '../../shared/models/eventsPost.models';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiEvent = 'http://localhost:3002/api/events'; // api pour gerer les evenenement
  private apiFavori = 'http://localhost:3002/api/favoris'; //api pour les favoris
  private apiComment = 'http://localhost:3002/api/commentaires'; //api pour les commentaires
  private apiCategorie = 'http://localhost:3002/api/categories';
  private apiLieu = 'http://localhost:3002/api/lieux';
  private apiPeriode = 'http://localhost:3002/api/periodes';
  private apiThematique = 'http://localhost:3002/api/thematiques';
  private apiCivilisation = 'http://localhost:3002/api/Civilisations';



  constructor(private http: HttpClient) { }

//methodes pour les evenements
  getAllEvents(): Observable<CollectionEvent[]> {
    return this.http.get<CollectionEvent[]>(this.apiEvent);
  }

   addEvent(payload: CollectionEventPost): Observable<any> {
      return this.http.post(this.apiEvent, payload, this.getAuthHeaders());
    }

  updateEventById (id: number, event: CollectionEventPost): Observable<CollectionEvent> {
    return this.http.put<CollectionEvent>(`${this.apiEvent}/${id}`, event, this.getAuthHeaders());
  }

  deleteEventById(id: number): Observable<any> {
    return this.http.delete(`${this.apiEvent}/${id}`, this.getAuthHeaders());
  }

  getEventById(id: number): Observable<CollectionEvent> {
    return this.http.get<CollectionEvent>(`${this.apiEvent}/${id}`);
  }


  //pour toujours verifier si le token le l'utlisateur connecté avant de faire une op
  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }


  //methodes pour les favoris
  addFavorite(id_evenement: number): Observable<any> {
    return this.http.post(this.apiFavori, { id_evenement }, this.getAuthHeaders());
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiFavori, this.getAuthHeaders());
  }

  removeFavorite(id_evenement: number): Observable<any> {
    return this.http.delete(`${this.apiFavori}/${id_evenement}`, this.getAuthHeaders());
  }



//methodes pour les commentaires
 getCommentsByEvent(eventId: number): Observable<CollectionComment[]> {
    return this.http.get<CollectionComment[]>(`${this.apiComment}/by-event/${eventId}`, this.getAuthHeaders());
  }
        // Récupérer les commentaires en attente
getPendingCommentaires(): Observable<CollectionComment[]> {
  return this.http.get<CollectionComment[]>(`${this.apiComment}/pending`, this.getAuthHeaders());
}

        // Valider un commentaire
validerCommentaire(id: number): Observable<any> {
  return this.http.put(`${this.apiComment}/${id}/valider`, {}, this.getAuthHeaders());
}

      // Refuser un commentaire
refuserCommentaire(id: number): Observable<any> {
  return this.http.put(`${this.apiComment}/${id}/refuser`, {}, this.getAuthHeaders());
}




  addComment(id_evenement: number, contenu: string): Observable<any> {
    return this.http.post(
      this.apiComment, { id_evenement, contenu }, this.getAuthHeaders()
    );
  }

//methodes pour les categories
getCategories(): Observable<categorie[]>{ 
  return this.http.get<categorie[]>(this.apiCategorie, this.getAuthHeaders())
}

//methodes pour les lieux
getLieux(): Observable<lieu[]>{ 
  return this.http.get<lieu[]>(this.apiLieu, this.getAuthHeaders())
}

//methodes pour les civilisations
getCivilisations(): Observable<civilisation[]>{ 
  return this.http.get<civilisation[]>(this.apiCivilisation, this.getAuthHeaders())
}

//methodes pour les periodes
getPeriodes(): Observable<periode[]>{ 
  return this.http.get<periode[]>(this.apiPeriode, this.getAuthHeaders())
}

//methodes pour les thematiques
getThematiques(): Observable<thematique[]>{ 
  return this.http.get<thematique[]>(this.apiThematique, this.getAuthHeaders())
}


}


