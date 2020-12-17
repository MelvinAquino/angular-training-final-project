import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  isLogged: boolean;
  first_name:any;
  last_name:any;
  alias:any;
  job_title:any;
  mobileNumber:any;
  email:any;
  photo_url:any;

  constructor(private _service: GlobalService, private route: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    if(!this._service.getToken()){
      this.route.navigate(['/']);
    }

    this._service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    );

    this._service.checkLogStatus();

    this._service.httpGetProfile();

    this._service.onHttpGetProfile.subscribe(
      (profile: any) => {
        this.first_name = profile.meta.first_name;
        this.last_name = profile.meta.last_name;
        this.job_title = profile.meta.job_title;
        this.mobileNumber = profile.meta.mobile_number;
        this.photo_url = profile.meta.photo_url;
        this.email = profile.email;
        this.alias = profile.alias;

      }
    )
  }

}
