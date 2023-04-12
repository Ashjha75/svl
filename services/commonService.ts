import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';


@Injectable()
export class CommonService extends BaseService {

	/* Generic HTTP requests */
	regularPostRequest(url, formData, headers) {
		return super.makePostRequest(url, formData, headers)
			.pipe(map(super.extractData), catchError((e) => {
				if (e instanceof Response && window.location.hostname !== 'localhost') {
					window.location.reload();
				} else {
					return throwError(
						new Error(`${e.status} ${e.statusText}`)
					);
				}
			}));
	}

	regularPutRequest(url, body, headers) {
		return super.makePutRequest(url, body, headers)
			.pipe(map(super.extractData), catchError((e) => {
				if (e instanceof Response && window.location.hostname !== 'localhost') {
					window.location.reload();
				} else {
					return throwError(
						new Error(`${e.status} ${e.statusText}`)
					);
				}
			}));
	}

	regularGetRequest(url, headers) {
		return super.makeGetRequest(url, headers)
			.pipe(map(super.extractData), catchError((e) => {
				if (e instanceof Response && window.location.hostname !== 'localhost') {
					window.location.reload();
				} else {
					return throwError(
						new Error(`${e.status} ${e.statusText}`)
					);
				}
			}));
	}

	regularDeleteRequest(url, headers) {
		return super.makeDeleteRequest(url, headers)
			.pipe(catchError((e) => {
				if (e instanceof Response && window.location.hostname !== 'localhost') {
					window.location.reload();
				} else {
					return throwError(
						new Error(`${e.status} ${e.statusText}`)
					);
				}
			}));
	}
}
