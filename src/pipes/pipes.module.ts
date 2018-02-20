import { NgModule } from '@angular/core';
import { CapitalizePipe } from './capitalize/capitalize';
import {TranslateModule} from 'ng2-translate/ng2-translate';
@NgModule({
	declarations: [CapitalizePipe],
	imports: [],
	exports: [CapitalizePipe, TranslateModule]
})
export class PipesModule {}
