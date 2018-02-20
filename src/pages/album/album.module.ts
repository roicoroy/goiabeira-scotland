import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AlbumPage } from './album';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    AlbumPage,
  ],
  imports: [
    IonicPageModule.forChild(AlbumPage),
    PipesModule
  ],
})
export class AlbumPageModule {}
