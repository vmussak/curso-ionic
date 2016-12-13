import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RegisterPage } from '../pages/register/register'
import firebase from 'firebase';

let firebaseConfig = {
	apiKey: "AIzaSyC3iBoMQ2rNRxELigKP2cz5ABpd9fgeglA",
	authDomain: "exemplofirebase-92691.firebaseapp.com",
	databaseURL: "https://exemplofirebase-92691.firebaseio.com",
	storageBucket: "exemplofirebase-92691.appspot.com",
	messagingSenderId: "702059850631"
};

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		RegisterPage
	],
	imports: [
		IonicModule.forRoot(MyApp)
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		RegisterPage
	],
	providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }]
})
export class AppModule {
	constructor() {
		firebase.initializeApp(firebaseConfig);
	}
 }
