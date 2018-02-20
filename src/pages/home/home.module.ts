import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { TextAvatarDirective } from '../../directives/text-avatar/text-avatar';

@NgModule({
  declarations: [
    HomePage,
    TextAvatarDirective
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
})
export class HomePageModule {}
