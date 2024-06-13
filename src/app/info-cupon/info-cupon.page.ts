import { Component, OnInit } from '@angular/core';
import { CouponService } from '../services/coupon.service';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-info-cupon',
  templateUrl: './info-cupon.page.html',
  styleUrls: ['./info-cupon.page.scss'],
})
export class InfoCuponPage implements OnInit {

  selectedCoupon : any;
  cupon: any;

  constructor(private couponService: CouponService, private activatedRoute: ActivatedRoute, private http: HttpClient) { 

  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const cuponId = params['id'];
      console.log('ID del cupón recibido:', cuponId); 
      this.cargarCupon(cuponId);
    });
  }

  cargarCupon(id: string) {
    this.http.get<any>(`https://couponapi2.azurewebsites.net/index.php/getUserCoupon?id=${id}`).subscribe(data => {
      this.selectedCoupon  = data;
      console.log('Informacion del ID cuopon:', this.selectedCoupon); 
    }, error => {
      console.error('Error al cargar el concierto', error);
    });
  }

}