import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionComponent } from './components/description/description.component';
import { LoginComponent } from './components/login/login.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BarberProfileComponent } from './components/barber-profile/barber-profile.component';
import { BaberReservationComponent } from './components/baber-reservation/baber-reservation.component';
import { BarberDescriptionComponent } from './components/barber-description/barber-description.component';
import { canActivate } from './services/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: DescriptionComponent },
  { path: 'barber', component: BarberDescriptionComponent },
  { path: 'login', component: LoginComponent },
  { 
    path: 'barbershop', 
    canActivate: [canActivate()], 
    loadComponent: () => import('./components/board-admin/board-admin.component').then((m) => m.BoardAdminComponent )
  },
  { path: 'user', component: BoardUserComponent },
  { path: 'barber-profile/:barber', component: BarberProfileComponent },
  { path: 'barber-reservation/:email', component: BaberReservationComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
