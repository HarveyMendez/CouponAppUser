import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';

const pagoUri = 'https://couponapiuser.azurewebsites.net/PagoRSA'; 


@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(private http: HttpClient) {}

  // Generar IV aleatorio
  generateIV(): string {
    return CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Base64);
  }

  cifrarRSA(datos: any, iv: string): string {
    const claveCifrado = '1aB3!2cDf@9ZxY&4'; // Esta clave debería ser más segura en producción
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(datos), CryptoJS.enc.Utf8.parse(claveCifrado), {
      iv: CryptoJS.enc.Base64.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.toString();
  }

  procesarPago(datosPago: any) {
    const iv = this.generateIV(); // Generar un IV único para cada cifrado
    const datosCifrados = this.cifrarRSA(datosPago, iv);
    console.log('Datos cifrados en procesar pago:', datosCifrados);
    return this.http.post(pagoUri, { datosCifrados, iv });
  }
}