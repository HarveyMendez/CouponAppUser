import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CouponService } from '../services/coupon.service';
import { CarritoService } from '../services/carrito.service';

import { AutenticacionService } from '../services/autenticacion.service';

@Component({
  selector: 'app-cupon',
  templateUrl: './cupon.page.html',
  styleUrls: ['./cupon.page.scss'],
})
export class CuponPage implements OnInit {

  coupons: any[] = [];
  cuponesFiltrados: any[] = [];
  categorias: string[] = [];
  searchTerm: string = '';
  selectedCategory: string | null = null; 

  userEmail: string | null = null; 

  constructor(private couponService: CouponService, private router: Router, private carritoService: CarritoService, private AutenticacionService: AutenticacionService) {}

  ngOnInit() {
    this.cargarCupones();
  }

  ionViewWillEnter() {
    this.userEmail = this.AutenticacionService.getUserEmail();
  }

  irADetalleConcierto(cupon: any) {
    console.log('Cupón seleccionado:', cupon);
    if (cupon && cupon.id) {
      console.log('ID del cupón seleccionado:', cupon.id);
      this.router.navigate(['/info-cupon', cupon.id]);
    } else {
      console.error('Cupón no tiene un ID válido', cupon);
    }
  }

  cargarCupones() {
    this.couponService.getUserCoupons().subscribe(
      (data) => {
        this.coupons = data;
        this.couponService.setCoupons(this.coupons);
        this.cuponesFiltrados = [...this.coupons];
        this.obtenerCategorias();
      },
      (error) => {
        console.error('Error Fetching cupones', error);
      }
    );
  }

  obtenerCategorias() {
    const categoriasSet = new Set<string>();
    this.coupons.forEach(cupon => {
      categoriasSet.add(cupon.categoria);
    });
    this.categorias = Array.from(categoriasSet);
  }

  filtrarPorCategoria() {
    if (this.selectedCategory) {
      this.cuponesFiltrados = this.coupons.filter(cupon => cupon.categoria === this.selectedCategory);
    } else {
      this.cuponesFiltrados = [...this.coupons];
    }
  }

  filtrarPorTermino(termino: string | null | undefined) {
    if (termino) { 
      this.cuponesFiltrados = this.coupons.filter(cupon =>
        cupon.nombre_cupon.toLowerCase().includes(termino.toLowerCase())
      );
    } else {
      this.cuponesFiltrados = [...this.coupons]; 
    }
  }

  agregarAlCarrito(event: Event, coupon: any) {
    event.stopPropagation(); 
    this.carritoService.agregarAlCarrito(coupon);
    alert("Cupon agregado al carrito con éxito");
    console.log('Agregando al carrito:', coupon);
  }

}