import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../../services/commonService';
import { counties } from '../../../assets/locationsData.json'
@Component({
  selector: 'app-address-identification',
  templateUrl: './address-identification.component.html',
  styleUrls: ['./address-identification.component.css']
})
export class AddressIdentificationComponent implements OnInit {
  @Output() error;
  @Output() display;
  errorMessage = ""
  addressForm: FormGroup
  loader = false;
  toggleoption = false
  body: {}
  toggleoption2 = false
  countries: {}
  parishs: {}
  parishs2: {}
  parishs3: {}
  idType: {}
  parishNames = []
  town = []
  townName = []
  tierList: {}
  bankName: {}
  bankAccountType: {}
  districtName = []
  set: string;
  set2: string;
  tiersId: string;
  firstlayer = false;
  secondLayer = false;
  thirdLayer = false;
  sourceUrl = "./assets/images/register/upload.png";
  constructor(private fb: FormBuilder, private router: Router, private _commonService: CommonService) { }

  ngOnInit() {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      suite: ['', Validators.required],
      parish: ['', Validators.required],
      town: ['', Validators.required],
      district: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      trn: ['', Validators.required],
      idtype: ['', Validators.required],
      idnum: ['', Validators.required],
      expiration: ['', Validators.required],
      img1: ['', Validators.required],
      img2: ['', Validators.required],
      radio1: ['false', Validators.required],
      tiers: [''],
      source: [''],
      occupation: [''],
      address: [''],
      bankName: [''],
      branchName: [''],
      accountNum: [''],
      accountType: [''],

    })
    this.loader = false

    this.tierList = this._commonService.tierList;
    this.countries = this._commonService.lookup;
    this.bankName = this._commonService.bankName;
    this.bankAccountType = this._commonService.bankAccountType;

    Object.keys(counties).forEach(key => {
      Object.keys(counties[key].parish).forEach(key2 => {
        this.parishNames.push((counties[key].parish[key2].name));
      })
    })

    this.idType = this._commonService.idType;

  }

  onSelect(selectedValue: string) {
    this.addressForm.get("town").reset("");
    this.addressForm.get("district").reset("");
    this.townName = []

    this.set = (event.target as HTMLSelectElement).selectedOptions[0].id;
    Object.keys(counties).forEach(key => {
      Object.keys(counties[key].parish).forEach(key2 => {

        if ((counties[key].parish[key2].name) == this.set) {
          Object.keys((counties[key].parish[key2].towns)).forEach(key3 => {
            this.townName.push(counties[key].parish[key2].towns[key3].name)
          });
        }

      })
    })
  }
  onSelect2(selectedValue: string) {
    this.addressForm.get("district").reset("");
    this.districtName = []
    this.set2 = (event.target as HTMLSelectElement).selectedOptions[0].id;
    Object.keys(counties).forEach(key => {
      Object.keys(counties[key].parish).forEach(key2 => {

        Object.keys((counties[key].parish[key2].towns)).forEach(key3 => {
          Object.keys(counties[key].parish[key2].towns[key3].districts).forEach(key4 => {
            if ((counties[key].parish[key2].towns[key3].name) == this.set2)
              this.districtName.push(counties[key].parish[key2].towns[key3].districts[key4].name);

          })
        });


      })
    })

  }
  onSelectTiers(selectedValue: string) {
    this.tiersId = (event.target as HTMLSelectElement).selectedOptions[0].id;
    console.log(this.tiersId);
    switch (this.tiersId) {
      case ("1"):
        this.firstlayer = false;
        this.secondLayer = false;
        this.thirdLayer = false;
        const sr = document.querySelector('#upload-btn3') as HTMLImageElement;
        const sr2 = document.querySelector('#upload-btn4') as HTMLImageElement;
        sr.src = this.sourceUrl;
        sr2.src = this.sourceUrl;
        this.addressForm.get("source").clearValidators();
        this.addressForm.get("occupation").clearValidators();
        this.addressForm.get("address").clearValidators();
        this.addressForm.get("bankName").clearValidators();
        this.addressForm.get("branchName").clearValidators();
        this.addressForm.get("accountNum").clearValidators();
        this.addressForm.get("accountType").clearValidators();

        this.addressForm.get("bankName").updateValueAndValidity();
        this.addressForm.get("branchName").updateValueAndValidity();
        this.addressForm.get("accountNum").updateValueAndValidity();
        this.addressForm.get("accountType").updateValueAndValidity();
        this.addressForm.get("address").updateValueAndValidity();
        this.addressForm.get("occupation").updateValueAndValidity();
        this.addressForm.get("source").updateValueAndValidity();

        this.addressForm.get("occupation").reset("")
        this.addressForm.get("occupation").reset("")
        this.addressForm.get("address")
        this.addressForm.get("bankName").reset("")
        this.addressForm.get("branchName").reset("")
        this.addressForm.get("accountNum").reset("")
        this.addressForm.get("accountType").reset("")
        break;
      case ("2"):
        this.firstlayer = true;
        this.secondLayer = false;
        this.thirdLayer = false;
        this.addressForm.get("source").setValidators(Validators.required);
        this.addressForm.get("occupation").clearValidators();
        this.addressForm.get("address").clearValidators();
        this.addressForm.get("bankName").clearValidators();
        this.addressForm.get("branchName").clearValidators();
        this.addressForm.get("accountNum").clearValidators();
        this.addressForm.get("accountType").clearValidators();

        this.addressForm.get("bankName").updateValueAndValidity();
        this.addressForm.get("branchName").updateValueAndValidity();
        this.addressForm.get("accountNum").updateValueAndValidity();
        this.addressForm.get("accountType").updateValueAndValidity();
        this.addressForm.get("address").updateValueAndValidity();
        this.addressForm.get("occupation").updateValueAndValidity();
        this.addressForm.get("source").updateValueAndValidity();

        this.addressForm.get("occupation").reset("")
        sr2.src = this.sourceUrl;
        this.addressForm.get("bankName").reset("")
        this.addressForm.get("branchName").reset("")
        this.addressForm.get("accountNum").reset("")
        this.addressForm.get("accountType").reset("")
        break;
      case ("3"):
        this.firstlayer = true;
        this.secondLayer = true;
        this.thirdLayer = false;
        this.addressForm.get("address").setValidators(Validators.required);
        this.addressForm.get("occupation").setValidators(Validators.required);
        this.addressForm.get("source").setValidators(Validators.required);

        this.addressForm.get("bankName").clearValidators();
        this.addressForm.get("branchName").clearValidators();
        this.addressForm.get("accountNum").clearValidators();
        this.addressForm.get("accountType").clearValidators();

        this.addressForm.get("bankName").updateValueAndValidity();
        this.addressForm.get("branchName").updateValueAndValidity();
        this.addressForm.get("accountNum").updateValueAndValidity();
        this.addressForm.get("accountType").updateValueAndValidity();
        this.addressForm.get("address").updateValueAndValidity();
        this.addressForm.get("occupation").updateValueAndValidity();
        this.addressForm.get("source").updateValueAndValidity();

        this.addressForm.get("bankName").reset("")
        this.addressForm.get("branchName").reset("")
        this.addressForm.get("accountNum").reset("")
        this.addressForm.get("accountType").reset("")

        break;
      case ("4"):
        this.addressForm.get("bankName").setValidators(Validators.required);
        this.addressForm.get("branchName").setValidators(Validators.required);
        this.addressForm.get("accountNum").setValidators(Validators.required);
        this.addressForm.get("accountType").setValidators(Validators.required);
        this.addressForm.get("address").setValidators(Validators.required);
        this.addressForm.get("occupation").setValidators(Validators.required);
        this.addressForm.get("source").setValidators(Validators.required);

        this.addressForm.get("bankName").updateValueAndValidity();
        this.addressForm.get("branchName").updateValueAndValidity();
        this.addressForm.get("accountNum").updateValueAndValidity();
        this.addressForm.get("accountType").updateValueAndValidity();
        this.addressForm.get("address").updateValueAndValidity();
        this.addressForm.get("occupation").updateValueAndValidity();
        this.addressForm.get("source").updateValueAndValidity();


        this.firstlayer = true;
        this.secondLayer = true;
        this.thirdLayer = true;
        break;
      default:
        this.firstlayer = false;
        this.secondLayer = false;
        this.thirdLayer = false;
    }

  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (oFREvent: any) => {

        const fileType = file.type.split('/')[1];
        if (fileType == 'jpeg' || fileType == 'jpg' || fileType == 'png') {
          event.target.parentElement.querySelector('#upload-btn').src = oFREvent.target.result;
          this.addressForm.controls.img1.setValue(file);
        } else {
          console.error('Invalid file format');
        }
      };
    }
  }
  onFileSelected2(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (oFREvent: any) => {
        const fileType = file.type.split('/')[1];
        if (fileType == 'jpeg' || fileType == 'jpg' || fileType == 'png') {
          event.target.parentElement.querySelector('#upload-btn2').src = oFREvent.target.result;
          this.addressForm.controls.img2.setValue(file);
        } else {
          console.error('Invalid file format');
        }
      };
    }
  }
  onFileSelected3(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (oFREvent: any) => {
        const fileType = file.type.split('/')[1];
        if (fileType == 'jpeg' || fileType == 'jpg' || fileType == 'png') {
          event.target.parentElement.querySelector('#upload-btn3').src = oFREvent.target.result;
          this.addressForm.controls.source.setValue(file);
        } else {
          console.error('Invalid file format');
        }
      };
    }
  }
  onFileSelected4(event) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (oFREvent: any) => {
        const fileType = file.type.split('/')[1];
        if (fileType == 'jpeg' || fileType == 'jpg' || fileType == 'png') {
          event.target.parentElement.querySelector('#upload-btn4').src = oFREvent.target.result;
          this.addressForm.controls.address.setValue(file);
        } else {
          console.error('Invalid file format');
        }
      };
    }
  }


  AddressApi() {
    // debugger
    if (!this.addressForm.valid) {
      return;
    }
    this.loader = true
    const formData = new FormData();
    formData.append('streetAddress', this.addressForm.get('street').value);
    formData.append('apartment', this.addressForm.get('suite').value);
    formData.append('parish', this.addressForm.get('parish').value);
    formData.append('town', this.addressForm.get('town').value);
    formData.append('district', this.addressForm.get('district').value);
    formData.append('email', this.addressForm.get('email').value);
    formData.append('trnNumber', this.addressForm.get('trn').value);
    formData.append('idTypeCD', this.addressForm.get('idtype').value);
    formData.append('idNumber', this.addressForm.get('idnum').value);
    formData.append('idExpirationDate', this.addressForm.get('expiration').value);
    formData.append('document', this.addressForm.get('img1').value);
    formData.append('documentBack', this.addressForm.get('img2').value);
    formData.append('optForCashRecharge', this.addressForm.get('radio1').value);
    formData.append('tier', this.addressForm.get('tiers').value);
    formData.append('sourceOfFund', this.addressForm.get('source').value);
    formData.append('occupation', this.addressForm.get('occupation').value);
    formData.append('addressProof', this.addressForm.get('address').value);
    formData.append('bankName', this.addressForm.get('bankName').value);
    formData.append('branchName', this.addressForm.get('branchName').value);
    formData.append('accountNumber', this.addressForm.get('accountNum').value);
    formData.append('accountType', this.addressForm.get('accountType').value);
    this._commonService.SignUpAddress(formData, localStorage.getItem("accessmedium")).subscribe((resp) => {
      if (resp.body.message.errorMessage == "") {
        this.router.navigate(['/security']);
      } else {
        this.loader = false
        this.display = !this.display;
        this.errorMessage = resp.body.message.errorMessage;
      }
    })
  }
  onClicked() {
    this.toggleoption = !this.toggleoption;
    this.toggleoption2 = false;
  }
  onClicked2() {
    this.toggleoption2 = !this.toggleoption2;
    this.toggleoption = false;
  }
  onClicked3() {
    this.toggleoption = false;
    this.toggleoption2 = false;

  }


  get street() {
    return this.addressForm.get('street');
  }
  get suite() {
    return this.addressForm.get('suite');
  }
  get parish() {
    return this.addressForm.get('parish');
  }
  get towns() {
    return this.addressForm.get('town');
  }
  get district() {
    return this.addressForm.get('district');
  }
  get email() {
    return this.addressForm.get('email');
  }
  get idtype() {
    return this.addressForm.get('idtype');
  }
  get idnum() {
    return this.addressForm.get('idnum');
  }
  get trn() {
    return this.addressForm.get('trn');
  }
  get tiers() {
    return this.addressForm.get('tiers');
  }
  get source() {
    return this.addressForm.get('source');
  }
  get occupation() {
    return this.addressForm.get('occupation');
  }
  get address() {
    return this.addressForm.get('address');
  }
  get bankNames() {
    return this.addressForm.get('bankName');
  }
  get branchName() {
    return this.addressForm.get('branchName');
  }
  get accountNum() {
    return this.addressForm.get('accountNum');
  }
  get accountType() {
    return this.addressForm.get('accountType');
  }


}

