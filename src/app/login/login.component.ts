import { Component, OnInit } from '@angular/core';
import { Login } from './login-model';
import { GlobalService } from '../service/global.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged: boolean;

  logins: Login = {
    username: '',
    password: ''
  }

  constructor(private _service: GlobalService, private route: Router, private titleService: Title) {
    this.isLogged = false;
  }

  loginForm: any;

  ngOnInit(): void {

    if(this._service.getToken()){
      this.route.navigate(['/']);
    }

    this.loginForm = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('', [Validators.required])
    });

    this.titleService.setTitle('FinalActivity | Log in');
  }

  onLogin(): void {
    if(!this.loginForm.valid){
      this.alertWithWarning('Please complete all required fields');
    }else{
      const formValues = this.loginForm.value;
      this._service.httpLogin(formValues);

      this._service.onHttpLogin.subscribe(
        (response: any) => {
          const token = response.token;
          this._service.setToken(token);

          if(this._service.getToken()){
            this.route.navigate(['/']);
          }
        }
      );
    }
  }

  alertWithWarning(message:string){
    swal.fire({
      icon: 'warning',
      title: '',
      text: message
    })
  }

}
