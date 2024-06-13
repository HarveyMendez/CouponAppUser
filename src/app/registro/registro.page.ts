import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

const uri = 'https://couponapiuser.azurewebsites.net/api/Usuario/Registrar';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  cedula : string = '';
  fechaNacimiento: string = '';
  correo: string = '';
  contrasenia: string = '';

  constructor(private http: HttpClient, private modalController: ModalController) { }

  ngOnInit() {
  }

  enviarDatos() {
    const datos = {
      nombre: this.nombre,
      apellido: this.apellido,
      cedula : this.cedula,
      fechaNacimiento: this.fechaNacimiento,
      correo: this.correo,
      contrasenia: this.contrasenia
    };
    console.log('Datos obtenidos:', datos);

    alert(`Enviando los siguientes datos:\nNombre: ${datos.nombre}\nApellidos: ${datos.apellido}\nCedulad: ${datos.cedula}\nFecha de Nacimiento: ${datos.fechaNacimiento}\nCorreo: ${datos.correo}\nContraseña: ${datos.contrasenia}`);

    this.http.post(uri, datos).subscribe(response => {
      console.log('Datos enviados:', response);
      // Aquí puedes manejar la respuesta de la API
    }, error => {
      console.error('Error al enviar los datos:', error);
      // Maneja el error de la solicitud HTTP
    });
  }

  validarContrasenia(): boolean {
    // Expresión regular para validar la contraseña
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
    return regex.test(this.contrasenia);
  }

  validarCorreo(): boolean {
    // Expresión regular para validar el correo electrónico
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(this.correo);
  }

  validarCedula(): boolean {
    // Expresión regular para validar la cédula con formato ##-####-####
    const regex = /^\d{2}-\d{4}-\d{4}$/;
    return regex.test(this.cedula);
  }
}
