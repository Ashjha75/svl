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
	public otpVerify(body, accesmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accesmedium,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/verify-otp';
		return this.regularPostRequest(url, body, headers);

	}
	public SignUpPersonal(body, accesmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accesmedium,
			'Platform-type': 'GY',
			'Client-type': 'WEB'
		})
		const url = '/api/register-personal';
		return this.regularPostRequest(url, body, headers);

	}

	public SignUpAddress(body, accesmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accesmedium,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/register-address';
		return this.regularPostRequest(url, body, headers);

	}

	public SignUpSecurity(body, accesmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accesmedium,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/register-security';
		return this.regularPostRequest(url, body, headers);

	}
	public review(accesmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accesmedium,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/activate-user';
		return this.regularPostRequest(url, null, headers);

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
