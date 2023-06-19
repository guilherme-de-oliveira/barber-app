import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map } from 'rxjs';
import { BarberService } from 'src/app/services/barber.service';

@Component({
  selector: 'app-barber-profile',
  templateUrl: './barber-profile.component.html',
  styleUrls: ['./barber-profile.component.scss']
})

export class BarberProfileComponent {
  barbershop: any = [];
  barbershopss$: Observable<any[]> | undefined;
  // images: any[];
  // _activeIndex: number = 2;

  // get activeIndex(): number {
  //   return this._activeIndex;
  // }

  // set activeIndex(newValue) {
  //   if (this.images && 0 <= newValue && newValue <= this.images.length - 1) {
  //     this._activeIndex = newValue;
  //   }
  // }

  // responsiveOptions: any[] = [
  //   {
  //     breakpoint: '1024px',
  //     numVisible: 5
  //   },
  //   {
  //     breakpoint: '768px',
  //     numVisible: 3
  //   },
  //   {
  //     breakpoint: '560px',
  //     numVisible: 1
  //   }
  // ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private barberService: BarberService) {
    this.barbershopss$ = this.barberService.barbershop$;

    this.activatedRoute.paramMap.subscribe(params => {
      const email = params.get('email');
      this.search(String(email));
    });
  }

  search(query: any) {
    console.log(query)
    this.barberService.search(query);
  }

  // next() {
  //   this.activeIndex++;
  // }

  // prev() {
  //   this.activeIndex--;
  // }
}
