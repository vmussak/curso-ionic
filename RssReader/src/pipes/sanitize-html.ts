import { Injectable, Pipe } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
	name: 'sanitizeHtml'
})
@Injectable()
export class SanitizeHTML {

	constructor(private sanitizer: DomSanitizer) {
		this.sanitizer = sanitizer;
	}

	transform(value, args) {
		return this.sanitizer.bypassSecurityTrustHtml(value);
	}

}