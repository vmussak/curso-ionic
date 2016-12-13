import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RssService {

	url: string = 'https://query.yahooapis.com/v1/public/yql?q=select%20title,link,content:encoded%20from%20rss%20where%20url=%22http://medium.com/feed/@joselitojunior1%22&format=json&diagnostics=true&callback=';

	constructor(public http: Http) {
		this.http = http;
	}

	public load() {
		return this.http.get(this.url)
						.map(res => res.json())
						.map(data => data.query.results.item);
	}
}
