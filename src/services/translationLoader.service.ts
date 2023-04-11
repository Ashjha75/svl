import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TranslationLoaderService {
    public dataAvailable: BehaviorSubject<any> = new BehaviorSubject(false);

    constructor(private translate: TranslateService) {
    }

    // public loadTranslations(lang: string, data: any): void{
    //     if (lang === undefined) {
    //         lang = 'en_US';
    //     }

    public loadTranslations(lang: string, data: any): void {
        this.translate.setTranslation(lang, {
            // home: (data && data.response) ? data.response : '',
             global: (data && data.global) ? data.global : '',
             ab: (data && data.ab) ? data.ab : '',
             displayText: (data && data.response) ? data.response : ''

        });
        this.translate.use(lang);
        this.dataAvailable.next(true);
    }
    // this.translate.setDefaultLang(lang);
    //     this.translate.use(lang);
    //     this.translate.setTranslation(lang, {
    //         dashboard: (data && data.dashboard) ? data.dashboard : '',
    //         global: (data && data.global) ? data.global : ''
    //     });
    //
    // }
}
