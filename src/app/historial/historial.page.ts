import { Component, OnInit } from '@angular/core';
import { LocalHistorialService } from '../services/local-historial.service';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.page.html',
  styleUrls: ['./historial.page.scss'],
})
export class HistorialPage implements OnInit {

  historialCompras: any[] = [];

  constructor(private localHistorialService: LocalHistorialService) {}

  ngOnInit() {
    this.obtenerHistorial();
  }

  obtenerHistorial() {
    this.historialCompras = this.localHistorialService.obtenerHistorial();
    console.log(this.localHistorialService.obtenerHistorial())
  }

  calcularTotalConImpuestos(total: number): number {
    const impuestos = total * 0.13; // Ejemplo de impuestos (13%)
    return total + impuestos;
  }

}
