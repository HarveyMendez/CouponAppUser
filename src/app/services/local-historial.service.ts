import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalHistorialService {

  private historialCompras: any[] = [];

  constructor() {
    // Recuperar el historial de compras almacenado previamente, si existe
    const storedHistorial = localStorage.getItem('historialCompras');
    if (storedHistorial) {
      this.historialCompras = JSON.parse(storedHistorial);
    }
  }

  agregarCompra(compra: any) {
    this.historialCompras.push(compra);
    this.actualizarLocalStorage();
  }

  obtenerHistorial(): any[] {
    return this.historialCompras;
  }

  private actualizarLocalStorage() {
    localStorage.setItem('historialCompras', JSON.stringify(this.historialCompras));
  }
}