import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-barber-profile',
  templateUrl: './barber-profile.component.html',
  styleUrls: ['./barber-profile.component.scss']
})

export class BarberProfileComponent {
  barber: any;

  constructor(
    private activatedRoute: ActivatedRoute){

    this.activatedRoute.paramMap.subscribe(params => {
      const aux = params.get('barber');
      this.barber = JSON.parse(String(aux));
      console.log(this.barber)
    });
  }
}
