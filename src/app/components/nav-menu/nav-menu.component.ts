import { Inject, Component, LOCALE_ID, Output, EventEmitter } from '@angular/core';
import { MenuItem } from 'primeng/api';
import contacts from '../../../assets/contacts.json';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  @Output() outputFromChild : EventEmitter<string> = new EventEmitter();
  contactItems = contacts.data;
  // Menu Items
  about: string = `About`;
  work: string = `Work`;
  experiment: string = `Projects`;
  configPlaceHolder: string = `Config`;
  contact: string = `Contact`;
  items: MenuItem[] = [
    { label: `${this.about}`, icon: 'pi pi-fw pi-home', command: () => { this.sendScrollTo("description")}},
    { label: `${this.work}`, icon: 'pi pi-fw pi-file', command: () => { this.sendScrollTo("experience")} },
    { label: `${this.experiment}`, icon: 'pi pi-fw pi-pencil', command: () => { this.sendScrollTo("experiment")} },
    { label: `${this.contact}`, icon: 'pi pi-fw pi-users', command: () => { this.sendScrollTo("contact")} },
  ];

  constructor(
    @Inject(LOCALE_ID) public activeLocale: string
  ) { }

  //  @TODO
  changeLocale(locale: string) {
    // When the visitor selects Portuguese, we redirect to `/pt`
    window.location.href = `/${this.activeLocale}`;
  }

  sendScrollTo(route: string) {
    this.outputFromChild.emit(route);
  }

  openUrl(url: string) {
    window.open(url, '_blank')
  }
}