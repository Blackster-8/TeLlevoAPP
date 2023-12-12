import { Component, OnInit, NgZone, ElementRef, ViewChild } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

export interface UserRegistrado {
  id: number,
  nombre: string,
  apellido: string,
  rut: string,
  telefono:string,
  correo: string,
  clave: string,
  claveConfirmada: string
}

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {

  toAdd:UserRegistrado = {
    id: 0,
    nombre: "",
    apellido: "",
    rut: "",
    telefono: "",
    correo: "",
    clave: "",
    claveConfirmada: ""
  }
  async registrarUsuario() {
    let users = await this.storage.get("users") || []
    this.toAdd.id = users.length + 1
    users.push(this.toAdd)
    this.storage.set("users", users)
    console.log(users)
    this.presentToast("Usuario registrado con éxito.");
  }
 

  constructor(private storage: Storage, private toast: ToastController) { }


  async presentToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
  async ngOnInit() {
    await this.storage.create();
  }


}
