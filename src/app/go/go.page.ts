import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';
import {ToastController } from '@ionic/angular';

export interface Trip {
  id: number,
  hora: string,
  capacidad: number,
  destino: string,
  precio: number
}

export interface Pasajero{
  check: boolean,
  cantidad: number
}

@Component({
  selector: 'app-go',
  templateUrl: './go.page.html',
  styleUrls: ['./go.page.scss'],
})
export class GoPage implements OnInit {

  toSelect: Pasajero = {
    check: false,
    cantidad: 0
  }

  trips: Trip[] = []

  pasajeros: Pasajero[] = []

  constructor(private storage: Storage, private toast: ToastController) { }

  async ngOnInit() {
    this.trips = await this.storage.get("trips") || []
    this.pasajeros = this.trips.map(trip => ({ check: false, cantidad: 0 }))
  }

  async handleCheckboxChange(toSelect: Pasajero) {
    this.pasajeros.forEach(pasajeros => {
      if (pasajeros !== toSelect) {
        toSelect.check = false;
        toSelect.cantidad = 0;
      }
    });
    await this.storage.set('pasajeros', this.pasajeros);
  }

  async handleSeleccionViaje(trips: Trip, pasajeros: Pasajero){
    if(pasajeros.check){
      const cantidadPasajeros = pasajeros.cantidad;

      if(trips.capacidad >= cantidadPasajeros){
        trips.capacidad -= cantidadPasajeros
        await this.storage.set('trips', this.trips)
        this.presentToast("Viaje seleccionado con éxito.");
      }else{
        this.presentToast("No hay suficientes asientos disponibles para esta cantidad de pasajeros.");
      }
    }
    
  }

  async presentToast(texto: string) {
    const toast = await this.toast.create({
      message: texto,
      duration: 1500,
      position: 'bottom',
    });
    await toast.present();
  }
}