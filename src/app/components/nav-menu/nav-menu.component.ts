import { Inject, Component, LOCALE_ID, Output, EventEmitter, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import contacts from '../../../assets/contacts.json';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit{
  @Output() outputFromChild : EventEmitter<string> = new EventEmitter();
  contactItems = contacts.data;
  // Menu Items
  about: string = `About`;
  user: string = `I'm looking for barbers`;
  barbershop: string = `I'm a barber`;
  contact: string = `Contact`;
  items: MenuItem[] = [
    { label: `${this.about}`, icon: 'pi pi-fw pi-home', routerLink: '/main'},
    { label: `${this.user}`, icon: 'pi pi-fw pi-shopping-cart', routerLink: '/user'},
    { label: `${this.barbershop}`, icon: 'pi pi-fw pi-users', command: () => { this.checkRedirect('barber')}},
    { label: `${this.contact}`, icon: 'pi pi-fw pi-phone', command: () => { this.sendScrollTo("contact")} },
  ];
  currentUser: User;
  currentUser$: BehaviorSubject<User>

  constructor(
    private token: TokenStorageService,
    @Inject(LOCALE_ID) public activeLocale: string,
    private router: Router,
    private tokenService: TokenStorageService
  ) {
    this.tokenService.user$.subscribe(data => this.currentUser = data)
  }
  
  ngOnInit(): void {

    // this.currentUser = this.token.getUser();
    console.log(this.currentUser)
  }

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

  logout(): void {
    this.token.signOut();
    this.tokenService.user$.next({email: ''})
    window.location.reload();
  }

  isEmptyObject(obj: any) {
    console.log(obj)
    return JSON.stringify(obj) === '{}'
  }

  checkRedirect(route: string) {
    if (route === 'barber') {
      return (Object.keys(this.currentUser).length > 0) ? 
        this.router.navigate(['/barbershop']) : 
        this.router.navigate(['/barber']);  
    }
    return this.router.navigate([route]);
  }
}