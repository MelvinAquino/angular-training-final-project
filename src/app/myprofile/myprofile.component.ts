import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { Router } from '@angular/router';
import { Profile } from './profile-model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  isLogged: boolean;

  constructor(private _service: GlobalService, private route: Router, private titleService: Title) {
    this.isLogged = false;
  }

  profileForm: any;

  profile: Profile = {
    email: '',
    first_name: '',
    last_name: '',
    job_title: '',
    password: '',
    alias: '',
    mobile_number: ''
  };

  ngOnInit(): void {
    if(!this._service.getToken()){
      this.route.navigate(['/']);
    }

    this.titleService.setTitle('FinalActivity | My Profile');

    this._service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    );

    this._service.checkLogStatus();
    this._service.httpGetProfile();

    this._service.onHttpGetProfile.subscribe(
      (profile: any) => {
        this.fillForm(profile);
      }
    )

    this.profileForm = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      first_name: new FormControl('', [Validators.required]),
      last_name: new FormControl('', [Validators.required]),
      job_title: new FormControl('', [Validators.required]),
      alias: new FormControl('', [Validators.required]),
      mobile_number: new FormControl('', [Validators.required]),
      password: new FormControl(''),
      confirm_password: new FormControl(''),
    });
  }

  fillForm(data: any): void {
    this.profileForm.patchValue({
      email: data.email,
      first_name: data.meta.first_name,
      last_name: data.meta.last_name,
      alias: data.alias,
      job_title: data.meta.job_title,
      mobile_number: data.meta.mobile_number
    });
  }

  onSubmit(){
    if(this.profileForm.valid){
      const formValues = this.profileForm.value;
      const newFormValues = {
        meta: {
          first_name: formValues.first_name,
          last_name: formValues.last_name,
          job_title: formValues.job_title,
          mobile_number: formValues.mobile_number,
          timezone: 'Asia/Manila'
        },
        current_password: '',
        email: formValues.email,
        alias: formValues.alias
      };

      this._service.httpUpdateProfile(newFormValues);
    }else{
      this.alertWithWarning('Form Field required')
    }
  }

  alertWithWarning(message:string){
    Swal.fire({
      icon: 'warning',
      title: message,
      text: "Please complete all required fields"
    })
  }

}
