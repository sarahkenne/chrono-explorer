// src/app/core/services/media.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { mediaPost } from '../../shared/models/mediaForPost';

@Injectable({
  providedIn: 'root'
})
export class MediaService {
  private apiMedia = 'http://localhost:3003/api/media';

  constructor(private http: HttpClient) {}

  private getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    };
  }

  // POST : Upload d’un média pour un événement
 uploadMedia(formData: FormData): Observable<any> {
  return this.http.post(`${this.apiMedia}/upload`, formData, this.getAuthHeaders());
}

  // GET : Récupération des médias liés à un événement
  getMediaByEvent(eventId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiMedia}/by-event/${eventId}`);
  }
}
