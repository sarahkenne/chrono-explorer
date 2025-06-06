import { Component, OnInit } from '@angular/core';
import { EventService } from '../../../core/services/event.services';
import { CommonModule } from '@angular/common';
import { forkJoin } from 'rxjs';
import { lieu } from '../../../shared/models/lieu.models';

@Component({
  
  selector: 'app-favorite-view',
  imports: [CommonModule],
  templateUrl: './favorite-view.component.html',
  styleUrl: './favorite-view.component.css'
})
export class FavoriteViewComponent implements OnInit {
  favorites: any[] = [];
  loading: boolean = false;
  errorMessage: string | null = null;
  allLieux: lieu[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadFavorites();

    this.eventService.getLieux().subscribe({
          next: (lieux: lieu[]) => {
            //console.log(cat)
            this.allLieux = lieux;
            console.log(this.allLieux)
          }
        });
  }

  loadFavorites(): void {
  this.loading = true;
  this.errorMessage = null;

  this.eventService.getFavorites().subscribe({
    next: (fav) => {
      console.log(fav)

      // Chargement des détails pour chaque id_evenement
      const details$ = fav.map(f => this.eventService.getEventById(f.id_evenement));
      
      forkJoin(details$).subscribe({
        next: (events) => {
          this.favorites = events;
          this.loading = false;
          console.log('associé à un evenement.')
        },
        error: () => {
          this.errorMessage = "Erreur lors du chargement des détails des événements.";
          this.loading = false;
        }
      });
    },
    error: (err) => {
      this.errorMessage = "Erreur lors du chargement des favoris.";
      this.loading = false;
    }
  });
}

getLieuNameById(id: number): string {
    const found = this.allLieux.find(lieu => lieu.id_lieu === id);
    return found ? found.nom_lieu : 'Liex inconnue';
  }

  // Optionnel : supprimer un favori depuis cette page
  removeFavorite(id_evenement: number): void {
    this.eventService.removeFavorite(id_evenement).subscribe({
      next: () => {
        this.favorites = this.favorites.filter(f => f.id_evenement !== id_evenement);
      },
      error: () => {
        alert("Erreur lors de la suppression du favori.");
      }
    });
  }

  // Dans favorites.component.ts, après avoir récupéré les favoris :



// ...



}
