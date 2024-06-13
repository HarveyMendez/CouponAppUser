import { Component, OnInit } from '@angular/core';
import { CarritoService } from '../services/carrito.service';
import { AutenticacionService } from '../services/autenticacion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  cuponesEnCarrito: any[] = [];
  total: number = 0;
  impuestos: number = 0;
  totalConImpuestos: number = 0;

  constructor(private carritoService: CarritoService, private autenticacionService : AutenticacionService, private router: Router) {}

  ngOnInit() {
    this.cuponesEnCarrito = this.carritoService.obtenerCuponesEnCarrito();
    this.calcularTotal();
  }

  calcularTotal() {
    console.log('Monto total' , this.carritoService.obtenerTotal())
    this.total = this.carritoService.obtenerTotal();
    this.impuestos = this.total * 0.13; 
    this.totalConImpuestos = this.total + this.impuestos;
  }

  vaciarCarrito() {
    this.carritoService.vaciarCarrito();
    this.cuponesEnCarrito = [];
    this.calcularTotal();
  }

  pagar() {
    if (!this.autenticacionService.checkLogin()) {
      alert("Por favor logearse antes de continuar con la compra");
      console.log("Por favor logearse antes de continuar con la compra")
      this.router.navigate(['/login']);
    } else {
      console.log('Pagando...', this.totalConImpuestos);
      this.router.navigate(['/pagar']);
    }
  }
}