import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class ApiManager extends BaseService {

    public static readonly POST = 1;
    public static readonly GET = 2;
    public static readonly PUT = 3;
    public static readonly JSONFILE = 4;
    public static readonly FILEUPLOAD = 5;
    public static readonly FILEDOWNLOAD = 6;
    public static readonly FILEDELETE = 7;
    public static readonly CUSTOMFILEDOWNLOAD = 8;
    /*... Add all the urls's here ...*/
    static readonly baseJsonUrlDev: String = '../assets/data/languageBundle.json';
    static readonly dashboard: String = '/hixapi/dashboard';
    static readonly logIn: String = '/AHCT/pingSession';
    static readonly update: String = '/hixapi/update-language-pref';
    fileUploadtProgress$;
    fileUploadProgressObserver;
    constructor( http: HttpClient) {
        super(http);
    }
    fetchData(
        url: string,
        params: any,
        requestType: number,
        body: any,
        successMethod?: Function,
        failureMethod?: Function,
        queryParams?: string[],
        file?: File
    ) {
        let result;
        if (requestType === ApiManager.GET) {
            result = super.makeGetRequest(url, params);
        } else if (requestType === ApiManager.POST) {
            result = super.makePostRequest(url, body, params);
        } else if (requestType === ApiManager.PUT) {
            result = super.makePutRequest(url, body, params);
        } else if (requestType === ApiManager.FILEUPLOAD) {
            result = this.makeFileRequest(url, params);
        } else if (requestType === ApiManager.FILEDOWNLOAD) {
            result = super.makePostRequest(url, body, params);
        } else if (requestType === ApiManager.CUSTOMFILEDOWNLOAD) {
            result = super.makeGetRequest(url, params);
        } else if (requestType === ApiManager.FILEDELETE) {
            result = super.makePostRequest(url, body, params);
        } else if (requestType === ApiManager.JSONFILE) {
            result = super.http().get(url);
        }

        return result.map((res: Response) => {
            if (successMethod) {
                successMethod();
            }
            return res;
        }).catch((error: Response | any) => {

            if (failureMethod) {
                failureMethod();
            }
            return error;
        });
    }


    public makeFileRequest(url: string, params: any): Observable<Response> {
        return Observable.create(observer => {
            const formData: FormData = new FormData(),
                xhr: XMLHttpRequest = new XMLHttpRequest();
            for (const key in params) {
                if (key) {
                    formData.append(key, params[key]);
                }
            }

            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        observer.next(JSON.parse(xhr.response));
                        observer.complete();
                    } else {
                        observer.error(xhr.response);
                    }
                }
            };
            xhr.upload.onprogress = (event) => {
                this.fileUploadProgressObserver.next(Math.round(event.loaded / event.total * 100));
            };

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Accept-Language', 'en-US');
            xhr.send(formData);
        });
    }
}
