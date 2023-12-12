import { Storage } from '@ionic/storage-angular';
import { Component, OnInit } from '@angular/core';

export interface Trip {
  id: number,
  hora: string,
  capacidad: number,
  destino: string,
  precio: number
}


@Component({
  selector: 'app-trips',
  templateUrl: './trips.page.html',
  styleUrls: ['./trips.page.scss'],
})
export class TripsPage implements OnInit {

  trips: Trip[] = []

  constructor(private storage: Storage) { }

  async ngOnInit() {
    this.trips = await this.storage.get("trips") || []
  }
}