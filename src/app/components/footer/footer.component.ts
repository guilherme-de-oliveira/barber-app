import { Component } from '@angular/core';
import contacts from '../../../assets/contacts.json'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  items = contacts.data;
}
