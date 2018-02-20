import { NgModule } from '@angular/core';
import { NewsletterComponent } from './newsletter/newsletter';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [NewsletterComponent],
	exports: [NewsletterComponent],
	imports:[ IonicModule.forRoot(NewsletterComponent) 
	], 
})
export class ComponentsModule {}
