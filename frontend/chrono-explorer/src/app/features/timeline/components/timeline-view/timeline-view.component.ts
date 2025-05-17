import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventService } from '../../../../core/services/mock-event.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  imports: [CommonModule, FormsModule],
  selector: 'app-timeline-view',
  templateUrl: './timeline-view.component.html',
  styleUrls: ['./timeline-view.component.css']
})
export class TimelineViewComponent implements OnInit {
  allEvents: any[] = [];
  filteredEvents: any[] = [];

  filter = {
    location: '',
    civilization: '',
    date: ''
  };

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      this.allEvents = events;
      this.sortAndFilterEvents();
    });
  }

  sortAndFilterEvents() {
    this.filteredEvents = this.allEvents
      .filter(event => {
        return (
          (this.filter.location === '' || event.location.toLowerCase().includes(this.filter.location.toLowerCase())) &&
          (this.filter.civilization === '' || event.civilization.toLowerCase().includes(this.filter.civilization.toLowerCase())) &&
          (this.filter.date === '' || event.startDate.includes(this.filter.date))
        );
      })
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }

  goToDetail(eventId: number) {
    this.router.navigate(['/events', eventId]);
  }
}
