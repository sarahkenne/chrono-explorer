import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/pages/register/register.component').then((m) => m.RegisterComponent),
  },
  { path: '', redirectTo: 'timeline', pathMatch: 'full' },
  {
    path: 'settings',
    loadComponent: () => import('./features/user-profil/user-settings/user-settings.component').then(m => m.SettingsComponent),
}, 
{
    path: 'admin/moderation',
    loadComponent: () => import('./features/admin/pages/comment-moderation/comment-moderation.component').then(m => m.CommentModerationComponent)
  }, 
  {
    path: 'admin/create-event',
    loadComponent: () => import('./features/admin/pages/event-create/event-create.component').then(m => m.EventCreateComponent)
  },
  {
    path: 'events/:id',
    loadComponent: () => import('./features/event-detail/event-detail.component').then(m => m.EventDetailComponent),
  },
  {
    path: "timeline",
    loadComponent: ()=>
      import("./features/timeline/components/timeline-view/timeline-view.component").then((m)=> m.TimelineViewComponent)
  },
  {
  path: 'forgot-password',
  loadComponent: () => import('./features/auth/pages/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
}

  
];
