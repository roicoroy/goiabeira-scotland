import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { Profile } from './profile';
import 'firebase/storage';

@NgModule({
  declarations: [
    Profile
  ],
  imports: [
    IonicPageModule.forChild(Profile),
  ],
  exports: [
    Profile
  ]
})
export class ProfileModule { }