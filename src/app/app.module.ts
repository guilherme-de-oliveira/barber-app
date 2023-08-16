import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { RouterModule } from '@angular/router';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenubarModule } from 'primeng/menubar';
import { DescriptionComponent } from './components/description/description.component';
import { FooterComponent } from './components/footer/footer.component';
import { DividerModule } from 'primeng/divider';
import { SelectButtonModule } from 'primeng/selectbutton';
import { AppRoutingModule } from './app-routing.module';
import { CardModule } from 'primeng/card';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { TagModule } from 'primeng/tag';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import { PasswordModule } from 'primeng/password';
import { TabViewModule } from 'primeng/tabview';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DataViewModule } from 'primeng/dataview';
import { ChipModule } from 'primeng/chip';
import { GalleriaModule } from 'primeng/galleria';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { BarberFormComponent } from './components/login/barber-form/barber-form.component';
import { ClientFormComponent } from './components/login/client-form/client-form.component';
import { BarberProfileComponent } from './components/barber-profile/barber-profile.component';
import { BaberReservationComponent } from './components/baber-reservation/baber-reservation.component';
import { BarberDescriptionComponent } from './components/barber-description/barber-description.component';

@NgModule({
  declarations: [
    AppComponent,
    DescriptionComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    NavMenuComponent,
    BoardUserComponent,
    BarberFormComponent,
    ClientFormComponent,
    BarberProfileComponent,
    BaberReservationComponent,
    BarberDescriptionComponent
  ],
  imports: [
    RouterModule.forRoot([]),
    BrowserModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    BrowserAnimationsModule,
    DividerModule,
    SelectButtonModule,
    AppRoutingModule,
    CardModule,
    TagModule,
    InputTextModule,
    ButtonModule,
    SplitButtonModule,
    PasswordModule,
    HttpClientModule,
    ReactiveFormsModule,
    TabViewModule,
    AutoCompleteModule,
    DataViewModule,
    ChipModule,
    GalleriaModule
  ],
  providers: [authInterceptorProviders ],
  bootstrap: [AppComponent]
})
export class AppModule { }
