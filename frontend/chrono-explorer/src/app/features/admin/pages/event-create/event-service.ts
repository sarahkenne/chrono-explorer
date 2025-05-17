import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  getCategories(): Observable<string[]> {
    return of(['Guerre', 'Paix', 'Révolution', 'Découverte', 'Invention']);
  }

  getCivilizations(): Observable<string[]> {
    return of(['Égyptienne', 'Grecque', 'Romaine', 'Chinoise', 'Arabe', 'Maya']);
  }

  createEvent(event: any): Observable<any> {
    console.log('Événement à créer (mock) :', event);
    return of({ success: true });
  }
}
