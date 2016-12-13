import { Component } from '@angular/core';
import { NavController, Platform, AlertController } from 'ionic-angular';
import { ResultPage } from '../result/result';
import { Geolocation, Splashscreen, Network } from 'ionic-native';
import { GoogleMap, GoogleMapsLatLng } from 'ionic-native';
import 'rxjs/add/operator/map';

@Component({
	templateUrl: 'home.html'
})
export class HomePage {
	platform: Platform;
	alertCtrl: AlertController;
	map: any;
	initialLat: any;
	initialLong: any;
	isOnline: boolean;

	constructor(public navCtrl: NavController, platform: Platform, alertCtrl: AlertController) {
		this.platform = platform;
		this.alertCtrl = alertCtrl;
		this.isOnline = true;

		this.platform.ready().then(() => {
			this.initMap();
		});

		let disconnectSubscription = Network.onDisconnect().subscribe(() => {
			let alert = this.alertCtrl.create({
				title: 'Sem conexão! :(',
				subTitle: 'O seu aparelho está sem acesso a internet. Ative a rede de dados ou conecte-se a uma rede Wi-Fi.',
				buttons: ["Ok"]
			});

			alert.present();
			this.isOnline = false;
		});

		let firstTime = true;

		let connectSubscription = Network.onConnect().subscribe(() => {
			setTimeout(() => {
				if (!firstTime) this.isOnline = true;
				firstTime = false;
			}, 3000);
		});
	}

	hideSplashScreen() {
		if (Splashscreen) {
			Splashscreen.hide();
		}
	}

	initMap() {
		this.platform.ready().then(() => {
			GoogleMap.isAvailable().then(() => {
				Geolocation.getCurrentPosition().then((resp) => {
					this.isOnline = true;
					this.initialLat = resp.coords.latitude;
					this.initialLong = resp.coords.longitude;

					this.map = new GoogleMap('map_canvas', {
						'controls': {
							'compass': false,
							'myLocationButton': true,
							'indoorPicker': false,
							'zoom': false
						},
						'camera': {
							'latLng': new GoogleMapsLatLng(this.initialLat, this.initialLong),
							'zoom': 13
						}
					});
					this.hideSplashScreen();
				}, () => {
					this.hideSplashScreen();
					let confirm = this.alertCtrl.create({
						title: 'Oops!',
						subTitle: 'Precisamos que você nos autorize a usar sua localização para indicarmos os bares mais próximos.',
						buttons: [
							{
								text: 'Autorizar',
								handler: () => {
									this.initMap();
								}
							}
						]
					});
					confirm.present();
				});
			});
		});
	}

	onPageDidEnter() {
		document.getElementById("map_canvas").style.display = 'block';
	}

	buscarBar() {
		this.map.getCameraPosition().then((resp) => {
			let params: Object = {
				lat: resp.target.lat,
				long: resp.target.lng,
				initalLat: this.initialLat,
				initialLong: this.initialLong
			};

			this.navCtrl.push(ResultPage, params);
		});
	}
}