import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IForm } from '../model/iform';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';
import { IAddress, IGreenLeavesRequest, IGreenLeavesResponse } from '../model/igreenleaves';
import { GreenleavesService } from '../services/greenleaves.service';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from './message/message.component';


export const FORMAT_DATE = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'D-MMM-YYYY',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
}
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: FORMAT_DATE },
  ],
})
export class FormComponent implements OnInit {

  constructor(
    private greenLeavesService: GreenleavesService,
    private matDialog: MatDialog,
  ) {
    const today = new Date();
    this.minDate = new Date(today.getFullYear()-100, today.getMonth(), today.getDate());
  }

  greenLeavesform: FormGroup<IForm>;
  dateFormat: string = 'dd-MMM-yyyy';
  locale: string = 'es-ES';
  minDate: Date;
  greenLeavesRequest: IGreenLeavesRequest;
  address: IAddress[];
  inputsInvalid: string[] = [];
  sendEmail: boolean = false;

  ngOnInit(): void {
    this._loadBuilder();

    this.addressControl.valueChanges.subscribe(change =>{
      if(this.addressControl.value.length >= 3){
        this.greenLeavesService.GetAddress(change).subscribe((resp: IAddress[]) =>{
          this.address = resp;
        });
      }
    })
  }

  _loadBuilder(): void {
    this.greenLeavesform = new FormGroup<IForm>({
      name: new FormControl<string>(undefined, { validators: [Validators.required] }),
      email: new FormControl<string>(undefined, { validators: [Validators.required, Validators.email] }),
      phone: new FormControl<string>(undefined, { validators: [Validators.required] }),
      date: new FormControl<string>(undefined, { validators: [Validators.required] }),
      address: new FormControl<string>(undefined, { validators: [Validators.required] }),
    });
  }

  get nameControl(): FormControl<string> {
    return this.greenLeavesform.controls.name;
  }
  get emailControl(): FormControl<string> {
    return this.greenLeavesform.controls.email;
  }
  get phoneControl(): FormControl<string> {
    return this.greenLeavesform.controls.phone;
  }
  get dateControl(): FormControl<string> {
    return this.greenLeavesform.controls.date;
  }
  get addressControl(): FormControl<string> {
    return this.greenLeavesform.controls.address;
  }

  validateFormat(event){
    let key;
    if(event.type === 'paste'){
      key = event.clipboardData.getData('text/plain');
    }else{
      key = event.keyCode;
      key = String.fromCharCode(key);
    }
    const regex = /[0-9\s()+#-]|\./;
    if(!regex.test(key)){
      event.returnValue = false;
      if(event.preventDefault){
        event.preventDefault();
      }
    }
  }

  showError(data: string[]){
    const dialogRef = this.matDialog.open(MessageComponent,{
      panelClass: 'custom-message',
      data: data
    })
    dialogRef.disableClose = true;
    dialogRef.afterClosed().subscribe(() =>{});
  }

  save() {
    if(this.greenLeavesform.valid){
      this.greenLeavesRequest = {
        name: this.nameControl.value,
        email: this.emailControl.value,
        phone: this.phoneControl.value,
        date: this.dateControl.value,
        address: this.addressControl.value
      }
      this.greenLeavesService.SendEmai(this.greenLeavesRequest).subscribe((resp: IGreenLeavesResponse) =>{
        console.log(resp);
        this.sendEmail= true;
      });
    }else{
      this.inputsInvalid = [];
      for(const controlName in this.greenLeavesform.controls){
        const control = this.greenLeavesform.get(controlName);
        if(control.invalid){
          this.inputsInvalid.push(controlName);
        }
      }
      this.showError(this.inputsInvalid)
    }
  }

}

