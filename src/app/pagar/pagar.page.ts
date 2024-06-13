import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PagoService } from '../services/pago.service';
import { HttpClient } from '@angular/common/http';

import { LocalHistorialService } from '../services/local-historial.service';
import { CarritoService } from '../services/carrito.service';

const loginUri = 'https://couponapiuser.azurewebsites.net/api/Carrito'

@Component({
  selector: 'app-pagar',
  templateUrl: './pagar.page.html',
  styleUrls: ['./pagar.page.scss'],
})
export class PagarPage implements OnInit {

  nombreTarjetahabiente: string = '';
  pan: string = '';
  fechaVencimiento: string = '';
  codigoSeguridad: string = '';

  totalConImpuestos: number = 0;

  constructor(private http: HttpClient, private router: Router, private carritoService: CarritoService, private pagoService: PagoService, private localHistorialService: LocalHistorialService) {}

  ngOnInit() {
    this.totalConImpuestos = this.carritoService.obtenerTotal();
  }

  realizarPago() {

    const cuponesEnCarrito = this.carritoService.obtenerCuponesEnCarrito();

    const compra = {
      cupones: cuponesEnCarrito,
      total: this.totalConImpuestos,
      fecha: new Date().toISOString()
    };

    if (!this.validarLuhn(this.pan)) {
      alert('El número de tarjeta no es válido.');
      return;
    }

    if (!this.validarFechaVencimiento()) {
      alert('La fecha de vencimiento de la tarjeta es inválida.');
      return;
    }

    const datosPago = {
      nombreTarjetahabiente: this.nombreTarjetahabiente,
      pan: this.pan,
      fechaVencimiento: this.fechaVencimiento,
      codigoSeguridad: this.codigoSeguridad
    };

    this.pagoService.procesarPago(datosPago).subscribe(
      (response) => {
        console.log('Pago exitoso:', response);
        alert('Su pago se ha realizado con éxito');
        this.localHistorialService.agregarCompra(compra);
        this.carritoService.vaciarCarrito();
        this.router.navigate(['/historial']);
      },
      (error) => {
        console.error('Error en el pago:', error);
        alert('Error en el procesamiento del pago. Intente nuevamente.');
      }
    );
  }
  validarLuhn(numeroTarjeta: string): boolean {
    let suma = 0;
    let debeDuplicar = false;
    
    // Recorrer la cadena de derecha a izquierda
    for (let i = numeroTarjeta.length - 1; i >= 0; i--) {
      let digito = +numeroTarjeta.charAt(i);

      if (debeDuplicar) {
        digito *= 2;
        if (digito > 9) {
          digito -= 9;
        }
      }

      suma += digito;
      debeDuplicar = !debeDuplicar;
    }

    return (suma % 10 === 0);
  }

  validarFechaVencimiento(): boolean {
    // Validar el formato MM/AA
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!regex.test(this.fechaVencimiento)) {
      return false;
    }

    // Obtener el mes y el año
    const partes = this.fechaVencimiento.split('/');
    const mes = +partes[0];
    const año = +('20' + partes[1]);

    // Obtener la fecha actual
    const fechaActual = new Date();
    const añoActual = fechaActual.getFullYear();
    const mesActual = fechaActual.getMonth() + 1; // getMonth devuelve 0-11

    // Comparar con la fecha actual
    if (año < añoActual || (año === añoActual && mes < mesActual)) {
      return false;
    }

    return true;
  }
}
