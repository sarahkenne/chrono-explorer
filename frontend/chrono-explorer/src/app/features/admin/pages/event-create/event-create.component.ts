import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EventService } from './event-service';

@Component({
  selector: 'app-event-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {
  event: any = {
    title: '',
    description: '',
    location: '',
    startDate: '',
    endDate: '',
    detailedContent: '',
    theme: '',
    category: '',
    civilization: '',
    image: null,
    multimediaArchive: ''
  };

  categories: string[] = [];
  civilizations: string[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getCategories().subscribe((cats: string[]) => {
      this.categories = cats;
    });
    //this.eventService.getCivilizations().subscribe((civs: string[]) => {
      //this.civilizations = civs;
   // });
  }

  onFileSelected(event: any) {
    this.event.image = event.target.files[0];
  }

  submitEvent() {
    if (this.isFormValid()) {
      this.eventService.createEvent(this.event).subscribe(() => {
        alert('Événement créé avec succès (mock)');
      });
    } else {
      alert('Veuillez remplir tous les champs obligatoires');
    }
  }

  isFormValid(): boolean {
    return this.event.title && this.event.description && this.event.location &&
      this.event.startDate && this.event.endDate && this.event.detailedContent &&
      this.event.theme && this.event.category && this.event.civilization;
  }
}
