import { Component, OnInit } from '@angular/core';
import { BarberFormComponent } from './barber-form/barber-form.component';
import { CommonModule } from '@angular/common';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-board-admin',
  standalone: true,
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.scss'],
  imports: [CommonModule, BarberFormComponent, TabViewModule ]
})

export class BoardAdminComponent  {


  constructor(){}

}