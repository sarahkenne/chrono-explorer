import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CollectionEvent } from '../../shared/models/event.models'; 

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiEvent = 'http://localhost:3002/api/events'; // api pour gerer les evenenement
  private apiFavori = 'http://localhost:3002/api/favoris'; //api pour les favoris
  private apiComment = 'http://localhost:3002/api/commentaires'; //api pour les commentaires
  
  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<CollectionEvent[]> {
    return this.http.get<CollectionEvent[]>(this.apiEvent);
  }

  getEventById(id: number): Observable<CollectionEvent> {
  return this.http.get<CollectionEvent>(`${this.apiEvent}/${id}`);
}


getCommentsByEvent(eventId: number): Observable<Comment[]> {
  return this.http.get<Comment[]>(`${this.apiComment}/commentaires/by-event/${eventId}`);
}

private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  addFavorite(id_evenement: number): Observable<any> {
    return this.http.post(this.apiFavori, { id_evenement }, this.getAuthHeaders());
  }

  getFavorites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiFavori, this.getAuthHeaders());
  }

  removeFavorite(id_evenement: number): Observable<any> {
    return this.http.delete(`${this.apiFavori}/${id_evenement}`, this.getAuthHeaders());
  }



addComment(id_evenement: number, contenu: string): Observable<any> {
  return this.http.post(
    this.apiComment,{ id_evenement, contenu }, this.getAuthHeaders()
  );
}




}


