import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactPage } from './contact';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';
import { TranslateService } from 'ng2-translate';

@NgModule({
  declarations: [
    ContactPage,
    
  ],
  imports: [
    IonicPageModule.forChild(ContactPage),
    PipesModule,
    
  ],
})
export class ContactPageModule {}
