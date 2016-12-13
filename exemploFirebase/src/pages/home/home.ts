import { Component, OnInit, NgZone } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { RegisterPage } from '../register/register';
import { Camera } from 'ionic-native';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	currentUser: any;
	credentials: {
		email?: string,
		password?: string
	} = {};
	profilePicture: string;
	profileRef: any;

	constructor(public navCtrl: NavController, public ngZone: NgZone, public alertCtrl: AlertController) {
		this.ngZone = ngZone;
		this.navCtrl = navCtrl;
		this.alertCtrl = alertCtrl;
	}

	ngOnInit() {
		firebase.auth().onAuthStateChanged(
			_currentUser => {
				this.ngZone.run(() => {
					this.currentUser = _currentUser || null;

					if (this.currentUser) {
						this.profileRef = firebase.database().ref(
							'profile/' + firebase.auth().currentUser.uid + '/profile_picture'
						);
						this.profileRef.on('value', snapshot => this.updateImage(snapshot));
					}
				});
			}
		);
	}

	fazerLogin(_credentials) {
		if (_credentials.valid) {
			firebase.auth().signInWithEmailAndPassword(
				_credentials.value.email,
				_credentials.value.password
			).then((auth) => {
				this.profileRef = firebase.database().ref(
					'profile/' + auth.uid + '/profile_picture'
				);
				console.log(auth);
			}, (e) => {
				this.showAlert(e.message);
				console.log(e);
			});
		}
	}

	fazerLogoff() {
		firebase.auth().signOut().then((auth) => {
			console.log(auth);
		}, (e) => {
			console.log(e);
		});
	}

	cadastrar() {
		this.navCtrl.push(RegisterPage);
	}

	tirarFoto() {
		Camera.getPicture({
			quality: 50,
			allowEdit: true,
			cameraDirection: Camera.Direction.FRONT,
			destinationType: Camera.DestinationType.DATA_URL
		}).then(
			imageData => {
				firebase.database().ref(
					'profile/' + firebase.auth().currentUser.uid
				).update({
					profile_picture: imageData
				});
			},
			err => {
				console.log(err);
			}
		);
	}

	updateImage(value) {
		this.profilePicture = value ? 'data:image/jpeg;base64,' + value.val() : null;
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
