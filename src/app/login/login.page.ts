import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AnimationController, NavController, ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';


export interface Usuario{
  correo: string,
  clave: string
}

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
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {

  usuariosRegistrados: UserRegistrado[] = []

  toChoose: Usuario = {
    correo: "",
    clave: ""
  }


  constructor(private anim: AnimationController,
    private toast: ToastController,
    private nav: NavController,
    private authService: AuthService,
    private storage: Storage) { }

  async obtenerDatosUsuarioRegistrado(correo: string, clave: string) {
    const usuariosRegistrados: UserRegistrado[] = await this.storage.get("users") || [];
    const usuarioEncontrado = usuariosRegistrados.find(usuario => usuario.correo === correo && usuario.clave === clave);
  
    if (usuarioEncontrado) {
      if(this.toChoose.correo.length > 5) {
        if (this.toChoose.clave.length > 5 && /\d/.test(this.toChoose.clave)) {
          this.presentToast("Bienvenido " + usuarioEncontrado.correo + "");
          this.nav.navigateForward(['/home'])
        } else {
          this.presentToast("Datos incorrectos");
        }
      }else{
        this.animarInput("#clave")
      }
    } else {
      this.animarInput("#usuario")
      this.presentToast("Datos incorrectos");
    }
  }


  /*validar() {
    if (this.toChoose.correo.length > 5) {
      if (this.toChoose.clave.length > 5 && /\d/.test(this.toChoose.clave)) {
        if (this.toChoose.correo == "ben.gonzalez@duocuc.cl" && this.toChoose.clave == "Benjita.uwu.69") {
          this.presentToast("Bienvenido " + this.toChoose.correo + "");
          this.nav.navigateForward(['/home'])
        } else {
          this.presentToast("Datos incorrectos");
        }
      } else {
        this.animarInput("#clave")
      }
    } else {
      this.animarInput("#usuario")
    }
  }*/


  animarInput(input: string) {
    let user = document.querySelector(input) as HTMLInputElement
    this.anim.create().addElement(user).duration(200)
      .iterations(3).keyframes([
        { offset: 0, 'transform': 'rotate(-3deg', 'background': '#faacac' },
        { offset: 0.5, 'transform': 'rotate(3deg' },
        { offset: 1, 'transform': 'rotate(0deg', 'background': '##faacac' },
      ]).play()
  }

  async presentToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }

  

  async ngOnInit() {
    this.usuariosRegistrados = await this.storage.get("usuariosRegistrados");
  }

}
