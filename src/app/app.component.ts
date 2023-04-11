import { Component, OnInit} from '@angular/core';
import { CommonService } from '../services/commonService';
import { TranslationLoaderService } from '../services/translationLoader.service';
import { HttpClient} from '@angular/common/http';
import { BaseService } from '../services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends BaseService implements OnInit {

  constructor(private translator: TranslationLoaderService, public commonService: CommonService, http: HttpClient) {
    super(http);
  }
  ngOnInit() {}

}
