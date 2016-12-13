import { Component } from '@angular/core';
import { RssService } from '../../providers/rss-service';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	retorno: any;

	constructor(public navCtrl: NavController, public rssService: RssService) {
		this.rssService = rssService;
		this.retorno = [];
		this.navCtrl = navCtrl;

		this.rssService.load().subscribe(
			data => {
				this.retorno = data;
			}
		)
	}

	openPage(post) {
		this.navCtrl.push(DetailsPage, { postSelecionado: post });
	}

}
