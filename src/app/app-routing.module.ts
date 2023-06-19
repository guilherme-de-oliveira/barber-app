import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DescriptionComponent } from './components/description/description.component';
import { LoginComponent } from './components/login/login.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BarberProfileComponent } from './components/barber-profile/barber-profile.component';
import { BaberReservationComponent } from './components/baber-reservation/baber-reservation.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  { path: 'main', component: DescriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'barbershop', component: BoardAdminComponent },
  { path: 'user', component: BoardUserComponent },
  { path: 'barber-profile/:email', component: BarberProfileComponent },
  { path: 'barber-reservation/:email', component: BaberReservationComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
