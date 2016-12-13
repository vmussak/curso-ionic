import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { AppAvailability, InAppBrowser } from 'ionic-native';

@Component({
	templateUrl: 'result.html'
})
export class ResultPage {
	navParams: NavParams;
	venueInfo: any;
	lat: string;
	long: string;
	initialLat: string;
	initialLong: string;

	constructor(public navCtrl: NavController, navParams: NavParams, private http: Http) {
		this.navParams = navParams;

		this.lat = navParams.get("lat");
		this.long = navParams.get("long");

		this.initialLat = navParams.get("initalLat");
		this.initialLong = navParams.get("initialLong");

		this.venueInfo = {};
		this.venueInfo.image = "img/map-placeholder.png";

		let apiUrl: string = "https://api.foursquare.com/v2/venues/search?ll=" + this.lat + "," + this.long + "&client_id=CGU3LEY2QNJ50AMQLQJOBEZDTFZ3VYB22HZTZONIUJLEO2KC&client_secret=APAKIP4VQCBSNFS4JXOR4OTUQXS331XERZONOKWPVDACSCBU&v=20140806%20&m=foursquare&categoryId=4bf58dd8d48988d116941735&limit=5&radius=300";

		this.http.get(apiUrl).map(res => res.json())
			.subscribe(data => {
				if (data.response.venues.length > 0) {

					let venue = data.response.venues[Math.floor(Math.random() * data.response.venues.length)];
					let venueApiUrl = "https://api.foursquare.com/v2/venues/" + venue.id + "?client_id=CGU3LEY2QNJ50AMQLQJOBEZDTFZ3VYB22HZTZONIUJLEO2KC&client_secret=APAKIP4VQCBSNFS4JXOR4OTUQXS331XERZONOKWPVDACSCBU&v=20140806%20&m=foursquare";


					this.http.get(venueApiUrl).map(res => res.json())
						.subscribe(data => {
							this.venueInfo = data.response.venue;


							this.venueInfo.url = this.venueInfo.shortUrl;
							this.venueInfo.exists = true;
							this.venueInfo.price = (this.venueInfo.attributes.groups.length > 0) ? (this.venueInfo.attributes.groups[0].summary) : "$?";
							this.venueInfo.address = this.venueInfo.location.formattedAddress[0];
							this.venueInfo.image = this.venueInfo.bestPhoto ? (this.venueInfo.bestPhoto.prefix + "512x512" + this.venueInfo.bestPhoto.suffix) : "https://maps.googleapis.com/maps/api/staticmap?center=" + this.venueInfo.location.lat + "," + this.venueInfo.location.lng + "&zoom=14&size=515x512&style=element:labels|visibility:off&key=AIzaSyD5aQsKh5xWGeHo4UUgIXwlRSjaBlGHCyA";
						});
				} else {
					this.venueInfo.noResults = true;
				}
			});
	}

	onPageDidEnter() {
		document.getElementById("map_canvas").style.display = 'none';
	}

	openFoursquare() {
		InAppBrowser.open(this.venueInfo.url, '_system', 'location=true');
	}
}