import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../../../core/services/event.services';
import { CollectionEvent } from '../../../../shared/models/event.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-services';

@Component({
  imports: [CommonModule, FormsModule,],
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {
  allEvents: CollectionEvent[] = [];
  filteredEvents: CollectionEvent[] = [];
  isLoggedIn = false;
  isLoggedAdmin = false;
  userName= ''

  filter = {
    location: '',       // ID lieu
    civilization: '',   // ID civilisation
    date: ''            // date_debut (année)
  };

  constructor(private eventService: EventService,private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe({
      next: (events: CollectionEvent[]) => {
        //console.log(events)
        this.allEvents = events;
        console.log(this.allEvents)
        this.sortAndFilterEvents();
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });
  }

  sortAndFilterEvents(): void {
    this.filteredEvents = this.allEvents
      .filter(event => {
        return (
          (this.filter.location === '' || event.id_lieu.toString().includes(this.filter.location)) &&
          (this.filter.civilization === '' || event.id_civilisation.toString().includes(this.filter.civilization.toLowerCase())) &&
          (this.filter.date === '' || event.date_debut.includes(this.filter.date))
        );
      })
      .sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime());

      this.authService.authStatus$.subscribe(status => {
      this.isLoggedIn = status;
      if (status) {
        const user = this.authService.getCurrentUser();
        this.userName = `${user.prenom_utilisateur} ${user.nom_utilisateur}`;
        if(user.role == 'admin'){
          this.isLoggedAdmin = true;
        }
      } else {
        this.userName = '';
      }
    });
  }

  goToDetail(eventId: number): void {

    if (this.isLoggedIn) {
      console.log(eventId)
      this.router.navigate(['events', eventId]);
    }
    else{
      alert("veillez vous authentifier SVP")
      this.router.navigate(['/login'])
    }
    
    
  }



  


}
