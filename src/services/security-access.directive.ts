import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import {  CommonService } from './commonService';
import { OnInit, AfterViewInit } from '@angular/core/src/metadata/lifecycle_hooks';

@Directive({
  selector: '[appSecurityAccess]'
})
export class SecurityAccessDirective implements  AfterViewInit {

  isDisabled = false;
  private fieldLevelAccess;

  @Input() accessPath: string;
  constructor(private el: ElementRef, private constantService: CommonService) {
  }
  ngAfterViewInit(): void {
        // const ref = this.constantService.getSecurityObject();

        // let url;
        // if(this.accessPath)
        // {
        //   url = this.accessPath;
        // }else {
        //   url = window.location.hash.replace('#', '');
        // }
        // if (ref && ref.accessMap) {
        //   this.fieldLevelAccess = ref.accessMap[url];
        //   if (this.fieldLevelAccess && !this.isNullOrEmpty(this.fieldLevelAccess.accessMode)) {
        //     this.fieldLevelAccess = this.fieldLevelAccess.fieldMapping;
        //   } else {
        //     this.fieldLevelAccess = {};
        //   }
        //   if (this.fieldLevelAccess && this.fieldLevelAccess != {}) {
        //     if (this.isFieldDisabled()) {
        //       let currentHtml = this.el.nativeElement.currentHtml;
        //       this.el.nativeElement.disabled = true;
        //       this.el.nativeElement.style.pointerEvents = 'none';
        //       this.isDisabled = true;
        //     }
        //     else if (this.isFieldHidden()) {
        //       this.el.nativeElement.style.display = 'none';
        //     }
        //   }
        // }
      }
  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    if (this.isDisabled) {
      event.stopPropagation();
    }
  }
  isNullOrEmpty(val) {
    if (val && val !== '') {
      return false;
    } return true;
  }
  isFieldHidden() {
    const id = this.fieldLevelAccess[this.el.nativeElement.id];
    if (!this.isNullOrEmpty(id) && 'h' === id) {
      return true;
    }
    return false;
  }
  isFieldDisabled(): any {
    const id = this.fieldLevelAccess[this.el.nativeElement.id];
    if (!this.isNullOrEmpty(id) && 'r' === id) {
      return true;
    }
    return false;
  }


}
