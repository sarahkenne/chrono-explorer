import { Routes } from '@angular/router';
import { TimelineViewComponent } from './features/timeline/components/timeline-view/timeline-view.component';
import { LoginComponent } from './features/auth/pages/login/login.component';
import { RegisterComponent } from './features/auth/pages/register/register.component';
import { SettingsComponent } from './features/user-profil/user-settings/user-settings.component';
import { CommentModerationComponent } from './features/admin/pages/comment-moderation/comment-moderation.component';
import { EventCreateComponent } from './features/admin/pages/event-create/event-create.component';
import { EventDetailComponent } from './features/event-detail/event-detail.component';
import { ForgotPasswordComponent } from './features/auth/pages/forgot-password/forgot-password.component';

export const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  { path: '', redirectTo: 'timeline', pathMatch: 'full' },
  {
    path: 'settings', component: SettingsComponent}, 
{
    path: 'admin/moderation', component: CommentModerationComponent}, 
  {
    path: 'admin/create-event', component: EventCreateComponent},
  {
    path: 'events/:id', component: EventDetailComponent},
  {
    path: "timeline", component: TimelineViewComponent},
  {
  path: 'forgot-password', component: ForgotPasswordComponent}

];
