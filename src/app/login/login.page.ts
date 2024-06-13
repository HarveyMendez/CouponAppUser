import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';  
import { AutenticacionService } from '../services/autenticacion.service';

const loginUri = 'https://couponapiuser.azurewebsites.net/api/Usuario/Login'

//const loginUri = 'http://localhost:5121/api/Usuario/Login';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  cedula : string = '';
  fechaNacimiento: string = '';
  correo: string = '';
  contrasenia: string = '';

  constructor(private http: HttpClient, private router: Router, private autenticacionService : AutenticacionService) { }

  ngOnInit() {
  }

  enviarDatosLogin() {
    const datos = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedula : this.cedula,
      fechaNacimiento: this.fechaNacimiento,
      correo: this.correo,
      contrasenia: this.contrasenia
    };

    console.log('Datos obtenidos:', datos);

    this.http.post(loginUri, datos).subscribe(response => {
      console.log('Datos enviados:', response);
      this.autenticacionService.login();
      alert(`Logeo Exitoso:\nCorreo: ${datos.correo}\nContraseña: ${datos.contrasenia}`);
      this.router.navigate(['/cupon']); 
    }, error => {
      console.error('Error al enviar los datos:', error);
      if (error.status === 401 || error.status === 400) {
        alert('Correo o contraseña incorrectos. Verifique e intente nuevamente.') ;
      } else {
        alert('Error al intentar iniciar sesión. Por favor, intente nuevamente más tarde.') ;
      }
    });
  }
}