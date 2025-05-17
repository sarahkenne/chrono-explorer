import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { HistoricalEvent } from '../../shared/models/event.models'; 

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = 'http://localhost:3000/api/events'; // à adapter selon ton backend

  constructor(private http: HttpClient) {}

  getAllEvents(): Observable<HistoricalEvent[]> {
    return this.http.get<HistoricalEvent[]>(this.apiUrl);
  }
}
