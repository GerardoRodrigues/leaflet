import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { InfoLuminariasModule } from '../components/info-luminarias/info-luminarias.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    LeafletModule,
    InfoLuminariasModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
