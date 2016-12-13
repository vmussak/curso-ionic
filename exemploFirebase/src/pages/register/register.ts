import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import firebase from 'firebase';

@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage {
	error:string;
	public fireAuth: any;
	public userProfile: any;
	submitted = false;
	credentials: { email?: string, password?: string } = {};
	constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
		this.fireAuth = firebase.auth();
		this.userProfile = firebase.database().ref('/profile');
		this.alertCtrl = alertCtrl;
	}

	doRegister(_credentials) {
		this.fireAuth.createUserWithEmailAndPassword(_credentials.value.email, _credentials.value.password).then((newUser) => {
			this.fireAuth.signInWithEmailAndPassword(_credentials.value.email, _credentials.value.password).then((authenticatedUser) => {
				this.userProfile.child(authenticatedUser.uid).set({
					email: _credentials.value.email
				}).then(() => {
					this.navCtrl.setRoot(HomePage);
				});
			})
		}, (e) => {
			this.showAlert(e.message);
			console.log(e)
		});
	}

	showAlert(message) {
		let alert = this.alertCtrl.create({
			title: 'Tem algo de errado :(',
			subTitle: message,
			buttons: ['OK']
		});
		alert.present();
  }
}