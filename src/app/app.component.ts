import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AutenticacionService } from './services/autenticacion.service';
import { CouponService } from './services/coupon.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Iniciar Sesión - Registrarse', url: '/login', icon: 'mail' },
    { title: 'Cupones', url: '/cupon', icon: 'paper-plane' },
    { title: 'Carrito', url: '/carrito', icon: 'heart' },
    { title: 'Mis Cupones', url: '/historial', icon: 'archive' },
    { title: 'Cerrar Sesión', url: '/login', icon: 'log-out' } // ítem para cerrar sesión
  ];

  userEmail: string | null = null; // Inicialización en el constructor

  coupons: any[] = [];

  constructor(private router: Router, private couponService: CouponService, private autenticacionService: AutenticacionService) {}

  ngOnInit() {
    this.couponService.getUserCoupons().subscribe(
      (data) => {
        this.coupons = data;
      },
      (error) => {
        console.error('Error fetching coupons', error);
      }
    );
  }

  ionViewWillEnter() {
    this.userEmail = this.autenticacionService.getUserEmail();
  }

}