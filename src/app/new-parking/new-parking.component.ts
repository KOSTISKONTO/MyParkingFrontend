import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-parking',
  templateUrl: './new-parking.component.html',
  styleUrls: ['./new-parking.component.css']
})
export class NewParkingComponent {

  parkingForm!: FormGroup;
  PolicyForm!: FormGroup;
  step = 1;

  indepolicy = -1;
  policy: any;
  indexpolicyweek = -1;
  policyweek: any;

  dayType = ['Daily', 'Weekend'];
  PolicyCost = ['FlatCost', 'CostByHour', 'ByHour', 'ByHourCustom', 'ByLocalTime', 'ByLocalTimeCustom'];

  general: any;
  generalweek: any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router) {
    this.parkingForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      zip: ['', Validators.required],
      afm: ['', [Validators.required, Validators.pattern(/^\d{9,10}$/)]],
      totalSpaces: ['', Validators.required],
      is24: [null, Validators.required],
      location:['', Validators.required],
      accept24: ['', Validators.required],
      startTime: [''],
      endTime: [''],
      afmowners: this.fb.array([this.fb.control('')]),
    });

    this.PolicyForm = this.fb.group({
      PolicyDayType: ['', Validators.required],
      PolicyWeekendType: ['', Validators.required],
      FlatCostDaily: this.createFlatCost(),
      CostByHourDaily: this.createCostByHour(),
      ByHourDaily: this.fb.array([this.createHour()]),
      ByHourCustomDaily: this.fb.array([this.createRangeGroup()]),
      ByLocalTimeDaily: this.fb.array([this.createTimeRangeGroup()]),
      ByLocalTimeCustomDaily: this.fb.array([this.createTimeRangeGroup()]),
      FlatCostWeekend: this.createFlatCost(),
      CostByHourWeekend: this.createCostByHour(),
      ByHourWeekend: this.fb.array([this.createHour()]),
      ByHourCustomWeekend: this.fb.array([this.createRangeGroup()]),
      ByLocalTimeWeekend: this.fb.array([this.createTimeRangeGroup()]),
      ByLocalTimeCustomWeekend: this.fb.array([this.createTimeRangeGroup()]),
      samedaily: ['', Validators.required]
    });
  }

  createFlatCost(): FormGroup {
    return this.fb.group({ flatcost: ['', [Validators.required, Validators.min(0)]] });
  }
  createCostByHour(): FormGroup {
    return this.fb.group({ cost: ['', [Validators.required, Validators.min(0)]] });
  }
  createHour(): FormGroup {
    return this.fb.group({
      fromHour: [null, [Validators.required, Validators.min(0)]],
      toHour: [null, [Validators.required, Validators.min(0)]],
      cost: [null, [Validators.required, Validators.min(0)]]
    });
  }
  createRangeGroup(): FormGroup {
    return this.fb.group({
      fromHour: ['', [Validators.required, Validators.min(0)]],
      toHour: ['', [Validators.required, Validators.min(0)]],
      cost: ['', [Validators.required, Validators.min(0)]]
    });
  }
  createTimeRangeGroup(): FormGroup {
    return this.fb.group({
      fromhour: ['', Validators.required],
      tohour: ['', Validators.required],
      cost: [null, [Validators.required, Validators.min(0)]]
    });
  }

  get flatCost(): FormGroup { return this.PolicyForm.get('FlatCostDaily') as FormGroup; }
  get CostByHour(): FormGroup { return this.PolicyForm.get('CostByHourDaily') as FormGroup; }
  get flatCostWeekend(): FormGroup { return this.PolicyForm.get('FlatCostWeekend') as FormGroup; }
  get costByHourWeekend(): FormGroup { return this.PolicyForm.get('CostByHourWeekend') as FormGroup; }

  get ByHourDaily(): FormArray { return this.PolicyForm.get('ByHourDaily') as FormArray; }
  get HourControls(): any { return this.ByHourDaily.controls; }
  addHour() { this.ByHourDaily.push(this.createHour()); }
  removeHour(index: number) { this.ByHourDaily.removeAt(index); }

  get ByHourWeekend(): FormArray { return this.PolicyForm.get('ByHourWeekend') as FormArray; }
  get HourControlsWeekend(): any { return this.ByHourWeekend.controls; }
  addHourWeekend() { this.ByHourWeekend.push(this.createHour()); }
  removeHourWeekend(index: number) { this.ByHourWeekend.removeAt(index); }

  get ByHourCustomDailyControls() { return (this.PolicyForm.get('ByHourCustomDaily') as FormArray).controls; }
  get ByHourCustomWeekendControls() { return (this.PolicyForm.get('ByHourCustomWeekend') as FormArray).controls; }
  addHourCustom() { (this.PolicyForm.get('ByHourCustomDaily') as FormArray).push(this.createRangeGroup()); }
  removeHourCustom(index: number) { (this.PolicyForm.get('ByHourCustomDaily') as FormArray).removeAt(index); }
  addHourCustomWeekend() { (this.PolicyForm.get('ByHourCustomWeekend') as FormArray).push(this.createRangeGroup()); }
  removeHourCustomWeekend(index: number) { (this.PolicyForm.get('ByHourCustomWeekend') as FormArray).removeAt(index); }

  get ByLocalTimeDailyControls() { return (this.PolicyForm.get('ByLocalTimeDaily') as FormArray).controls; }
  get ByLocalTimeWeekendControls() { return (this.PolicyForm.get('ByLocalTimeWeekend') as FormArray).controls; }
  addLocalTime() { (this.PolicyForm.get('ByLocalTimeDaily') as FormArray).push(this.createTimeRangeGroup()); }
  removeLocalTime(index: number) { (this.PolicyForm.get('ByLocalTimeDaily') as FormArray).removeAt(index); }
  addLocalTimeWeekend() { (this.PolicyForm.get('ByLocalTimeWeekend') as FormArray).push(this.createTimeRangeGroup()); }
  removeLocalTimeWeekend(index: number) { (this.PolicyForm.get('ByLocalTimeWeekend') as FormArray).removeAt(index); }

  get ByLocalTimeCustomDailyControls() { return (this.PolicyForm.get('ByLocalTimeCustomDaily') as FormArray).controls; }
  get ByLocalTimeCustomWeekendControls() { return (this.PolicyForm.get('ByLocalTimeCustomWeekend') as FormArray).controls; }
  addLocalTimeCustom() { (this.PolicyForm.get('ByLocalTimeCustomDaily') as FormArray).push(this.createTimeRangeGroup()); }
  removeLocalTimeCustom(index: number) { (this.PolicyForm.get('ByLocalTimeCustomDaily') as FormArray).removeAt(index); }
  addLocalTimeCustomWeekend() { (this.PolicyForm.get('ByLocalTimeCustomWeekend') as FormArray).push(this.createTimeRangeGroup()); }
  removeLocalTimeCustomWeekend(index: number) { (this.PolicyForm.get('ByLocalTimeCustomWeekend') as FormArray).removeAt(index); }

  get afmowners() { return this.parkingForm.get('afmowners') as FormArray; }
  addOwner() { this.afmowners.push(this.fb.control('')); }
  removeOwner(index: number) { this.afmowners.removeAt(index); }

  addstep() {
    if (this.parkingForm.get('name')?.invalid || this.parkingForm.get('address')?.invalid ||
        this.parkingForm.get('city')?.invalid || this.parkingForm.get('zip')?.invalid
        || this.parkingForm.get('afm')?.invalid || this.parkingForm.get('totalSpaces')?.invalid) {
      this.parkingForm.markAllAsTouched();
      return;
    }
    this.step += 1;
  }
  addstep2() {
    if (this.parkingForm.get('is24')?.invalid || this.parkingForm.get('accept24')?.invalid) {
      this.parkingForm.markAllAsTouched();
      return;
    }
    this.step += 1;
  }
  addstep3() {

    console.log(this.indepolicy + "  "  + this.PolicyForm.get(this.policy+'Daily')?.value );
    
    if (
      (this.indepolicy===0 && this.PolicyForm.get('FlatCostDaily')?.invalid)  ||
      (this.indepolicy===1 && this.PolicyForm.get('CostByHourDaily')?.invalid)  ||
      (this.indepolicy===2 && this.PolicyForm.get('ByHourDaily')?.invalid)  ||
      (this.indepolicy===3 && this.PolicyForm.get('ByHourCustomDaily')?.invalid)  ||
      (this.indepolicy===4 && this.PolicyForm.get('ByLocalTimeDaily')?.invalid)  ||
      (this.indepolicy===5 && this.PolicyForm.get('ByLocalTimeCustomDaily')?.invalid)
      
     ) {
       this.PolicyForm.markAllAsTouched();
       return;
     }
     this.step+=1;
     console.log(this.getindexpolweek());
   
  }

  addstep4() {

    console.log(this.indepolicy + "  "  + this.PolicyForm.get(this.policy+'Daily')?.value );
    if (
      (this.indexpolicyweek===0 && this.PolicyForm.get('FlatCostWeekend')?.invalid)  ||
      (this.indexpolicyweek===1 && this.PolicyForm.get('CostByHourWeekend')?.invalid)  ||
      (this.indexpolicyweek===2 && this.PolicyForm.get('ByHourWeekend')?.invalid)  ||
      (this.indexpolicyweek===3 && this.PolicyForm.get('ByHourCustomWeekend')?.invalid)  ||
      (this.indexpolicyweek===4 && this.PolicyForm.get('ByLocalTimeWeekend')?.invalid)  ||
      (this.indexpolicyweek===5 && this.PolicyForm.get('ByLocalTimeCustoWeekend')?.invalid)||
      (this.PolicyForm.get('samedaily')?.invalid)
     ) {
       this.PolicyForm.markAllAsTouched();
       return;
     }
     this.step+=1;
     console.log(this.getindexpolweek());
   
  }


  plinstep() { this.step -= 1; }

  setindexpolicy(index: number, policy: string) { this.indepolicy = index; this.policy = policy; }
  getindexpolweek() { return this.indexpolicyweek; }
  getIndexpol() { return this.indepolicy; }
  setindexpolicyweek(indexweek: number, policyweek: string) { this.indexpolicyweek = indexweek; this.policyweek = policyweek; }

  onSubmit() {
    console.log("Submit started");
  
    const selectedDailyPolicy = this.policy;
    const selectedWeekendPolicy = this.policyweek;
    const sameAsDaily = this.PolicyForm.get('samedaily')?.value === true;
  
    const isDailyValid = this.PolicyForm.get(selectedDailyPolicy + 'Daily')?.valid;
    const isWeekendValid = sameAsDaily || this.PolicyForm.get(selectedWeekendPolicy + 'Weekend')?.valid;
  
    if (this.parkingForm.valid && isDailyValid && isWeekendValid) {
      const dailyPolicyData = this.PolicyForm.get(selectedDailyPolicy + 'Daily')?.value;
      const weekendPolicyData = sameAsDaily
        ? dailyPolicyData
        : this.PolicyForm.get(selectedWeekendPolicy + 'Weekend')?.value;
  
      this.general = [
        {
          dayType: 'Daily',
          policy: selectedDailyPolicy,
          [selectedDailyPolicy]: dailyPolicyData
        },
        {
          dayType: 'Weekend',
          policy: sameAsDaily ? selectedDailyPolicy : selectedWeekendPolicy,
          [sameAsDaily ? selectedDailyPolicy : selectedWeekendPolicy]: weekendPolicyData
        }
      ];
  
      const finalyform = {
        parking: {
          name_of_parking: this.parkingForm.get('name')?.value,
          City: this.parkingForm.get('city')?.value,
          address: this.parkingForm.get('address')?.value,
          TK: this.parkingForm.get('zip')?.value,
          afm: this.parkingForm.get('afm')?.value,
          Accept24:this.parkingForm.get('accept24')?.value,
          location:this.parkingForm.get('location')?.value,
          total_spaces: this.parkingForm.get('totalSpaces')?.value,
          startworking: this.parkingForm.get('startTime')?.value,
          endworking: this.parkingForm.get('endTime')?.value,
          Is24: this.parkingForm.get('is24')?.value,
          generalPolicyList: this.general
        },
        "AfmOwners": this.parkingForm.get('afmowners')?.value
      };
  
      console.log("FINAL FORM:", finalyform);
      this.http.post<any>('http://localhost:8080/parking/newParking', finalyform).subscribe(
        (response) => {
          console.log(response);
          alert('Η καταχώρηση έγινε με επιτυχία! Μεταβείτε στο Parking σας, ( ' + 'http://localhost:4200/myparking' + ' )' + 'για να ανεβάσετε τα απαιτούμενα έγγραφα, ώστε να πραγματοποιηθεί ο σχετικός έλεγχος και να καταω=χωρηθεί ολοκληρωτικά η επιχείρησή σας.');
        },
        (error) => {
          console.error(error);
          alert('Κάτι πήγε στραβά!');
        }
      );
      this.router.navigate(['']);
    } else {
      console.warn('Form is invalid');
      this.parkingForm.markAllAsTouched();
      this.PolicyForm.markAllAsTouched();
    }
  }
  
}
