import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { DetailsPage } from '../pages/details/details';
import { RssService } from '../providers/rss-service';
import { SanitizeHTML } from '../pipes/sanitize-html';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		DetailsPage,
		SanitizeHTML
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		DetailsPage
	],
	providers: [
		{ 
			provide: ErrorHandler,
			useClass: IonicErrorHandler
		},
		RssService
	]
})
export class AppModule { }
