import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MOCK_EVENTS } from './mock-events';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor() {}

  getEventById(id: number): Observable<any> {
    const event = MOCK_EVENTS.find(e => e.id === id);
    return of(event);
  }

  getAllEvents(): Observable<any[]> {
    return of(MOCK_EVENTS);
  }
}
