import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable()
export class CommonService extends BaseService {

	token = localStorage.getItem("accessmedium");
	lookup: {}
	counteryPhoneCode: {}
	gender: {}
	parish: {}
	idType: {}
	securityQuestions: {}


	public lookUps(body): Observable<any> {
		const headers = new HttpHeaders({
			'Authorization': `Bearer ${this.token}`,
			'Accept': 'application/json',
			'Platform-type': 'JM',
			'Client-type': 'WEB',
		})
		const url = '/api/lookups';
		return super.makePostRequest(url, body, headers);
	}

	public register(body): Observable<any> {
		const headers = new HttpHeaders({
			'Platform-type': 'JM',
			'Client-type': 'WEB',
		});
		const url = '/api/register-mobile';
		return super.makePostRequest(url, body, headers);
	}
	public otpVerify(body, accessmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accessmedium,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/verify-otp';
		return super.makePostRequest(url, body, headers);

	}
	public resendOtp(body, accessmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accessmedium,
			'Platform-Type': 'GY',
			'Client-Type': 'WEB'
		})
		const url = '/api/resend-otp';
		return super.makePostRequest(url, body, accessmedium);
	}
	public SignUpPersonal(body, accessmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accessmedium,
			'Platform-type': 'GY',
			'Client-type': 'WEB'
		})
		const url = '/api/register-personal';
		return super.makePostRequest(url, body, headers);

	}

	public SignUpAddress(body, accessmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accessmedium,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/register-address';
		return super.makePostRequest(url, body, headers);

	}

	public SignUpSecurity(body, accessmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accessmedium,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/register-security';
		return super.makePostRequest(url, body, headers);

	}
	public review(accessmedium): Observable<any> {
		const headers = new HttpHeaders({
			'Access-Medium': accessmedium,
			'Platform-type': 'JM',
			'Client-type': 'WEB'
		})
		const url = '/api/activate-user';
		return super.makePostRequest(url, null, headers);

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
