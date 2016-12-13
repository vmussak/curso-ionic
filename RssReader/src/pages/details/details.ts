import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
	selector: 'page-details',
	templateUrl: 'details.html'
})
export class DetailsPage {

	post:any;

	constructor(public navCtrl: NavController, navParams: NavParams) {
		this.post = navParams.get('postSelecionado');
	}
}
