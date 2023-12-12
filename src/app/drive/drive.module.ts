import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { DrivePageRoutingModule } from './drive-routing.module';

import { DrivePage } from './drive.page';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DrivePageRoutingModule
  ],
  declarations: [DrivePage]
})
export class DrivePageModule { }
