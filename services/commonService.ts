import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
@Injectable()
export class CommonService extends BaseService {


	public register(body): Observable<any> {
		const headers = new HttpHeaders({
			'Content-Type': 'application/json',
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		});
		const url = '/api/register-mobile';
		return this.regularPostRequest(url, body, headers);
	}
	public otpVerify(body): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': ,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/verify-otp';
		return this.regularPostRequest(url, body, headers);

	}


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
