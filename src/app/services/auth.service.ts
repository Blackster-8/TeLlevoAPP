import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private storage: Storage | null = null;

  constructor(private storageService: Storage) { }

  async init() {
    this.storage = await this.storageService.create();
  }

  async loginUser(username: string, password: string): Promise<boolean> {
    if (!this.storage) {
      await this.init();
    }

    // Lógica de autenticación
    // Comprueba si las credenciales son válidas (puede variar según tu implementación)
    const validCredentials = (username === "usuario" && password === "contraseña"); // Cambia esta lógica a tu proceso de autenticación real

    if (validCredentials) {
      await this.storage?.set('username', username);
      return true; // Retorna true si las credenciales son válidas
    } else {
      return false; // Retorna false si las credenciales son inválidas
    }
  }
  
  async logoutUser() {
    if (!this.storage) {
      await this.init();
    }

    // Lógica para cerrar sesión
    // Elimina los datos del Storage al cerrar sesión
    await this.storage?.remove('username');
    // Limpia otros datos de sesión si es necesario
  }

  async getUsername(): Promise<string | null> {
    if (!this.storage) {
      await this.init();
    }

    // Obtener el nombre de usuario almacenado en el Storage
    return await this.storage?.get('username');
  }

  // Puedes agregar más métodos para manejar otros datos de sesión si es necesario
}