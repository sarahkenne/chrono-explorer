import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EventService } from '../../../../core/services/event.services';
import { CollectionEvent } from '../../../../shared/models/event.models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../core/services/auth-services';
import { lieu } from '../../../../shared/models/lieu.models';
import { civilisation } from '../../../../shared/models/civilisation.models';

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
  allLieux: lieu[]=[];
  allCivs: civilisation[]= [];

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
        //console.log(this.allEvents)
        this.sortAndFilterEvents();
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });

     this.eventService.getLieux().subscribe({
      next: (lieu: lieu[]) => {
        //console.log(events)
        this.allLieux = lieu;
        //console.log(this.allLieux)
      },
      error: err => {
        console.error('Erreur lors de la récupération des événements :', err);
      }
    });

    this.eventService.getCivilisations().subscribe({
      next: (civilisations: civilisation[]) => {
        //console.log(cat)
        this.allCivs = civilisations;
        //console.log(this.allCivs)
      }
    });

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

  sortAndFilterEvents(): void {
    this.filteredEvents = this.allEvents
      .filter(event => {
     const lieuNom = this.getLieuNameById(event.id_lieu).toLowerCase();
      const civNom = this.getCivilisationNameById(event.id_civilisation).toLowerCase();
      const dateDebut = event.date_debut;

      const filterLieu = this.filter.location.toLowerCase().trim();
      const filterCiv = this.filter.civilization.toLowerCase().trim();
      const filterDate = this.filter.date.trim();

      const civMatch = filterCiv === '' || filterCiv
        .split(' ')
        .some(word => civNom.includes(word));

      const lieuMatch = filterLieu === '' || filterLieu
        .split(' ')
        .some(word => lieuNom.includes(word));

      const dateMatch = filterDate === '' || dateDebut.includes(filterDate);

      return civMatch && lieuMatch && dateMatch;
      })
      .sort((a, b) => new Date(b.date_debut).getTime() - new Date(a.date_debut).getTime());

      
  }

  //faire correspondre les ids des liex a leur  
 getLieuNameById(id: number): string {
    const found = this.allLieux.find(lieu => lieu.id_lieu === id);
    return found ? found.nom_lieu : 'Liex inconnue';
  }

  getCivilisationNameById(id: number): string {
    const found = this.allCivs.find(civ => civ.id_civilisation === id);
    return found ? found.nom_civilisation : 'civilisation inconnue';
  }

  goToDetail(eventId: number): void {

    if (this.isLoggedIn) {
      //console.log(eventId)
      this.router.navigate(['events', eventId]);
    }
    else{
      alert("veillez vous authentifier SVP")
      this.router.navigate(['/login'])
    }
    
    
  }



  


}
