import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { TimelineViewComponent } from './features/timeline/components/timeline-view/timeline-view.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { SettingsComponent } from './features/user-profil/user-settings/user-settings.component';
import { CommentModerationComponent } from './features/admin/pages/comment-moderation/comment-moderation.component';
import { EventCreateComponent } from './features/admin/pages/event-create/event-create.component';
import { EventDetailComponent } from './features/event-detail/event-detail.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, 
    HeaderComponent, 
    FooterComponent,
    SettingsComponent,
    TimelineViewComponent, 
    LoginComponent,
    EventCreateComponent,
    CommentModerationComponent,
    RegisterComponent,
    EventDetailComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'chrono-explorer';
}
