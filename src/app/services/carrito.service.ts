import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private cupones: any[] = [];

  constructor() {}

  agregarAlCarrito(cupon: any) {
    this.cupones.push(cupon);
  }

  eliminarDelCarrito(index: number) {
    this.cupones.splice(index, 1);
  }

  obtenerCuponesEnCarrito() {
    return this.cupones;
  }

  vaciarCarrito() {
    this.cupones = [];
  }

  obtenerTotal() {
    const total = this.cupones.reduce((acc, cupon) => acc + parseFloat(cupon.precio), 0);
    console.log('Calculando total en CarritoService:', total);
    return total;
  }
}