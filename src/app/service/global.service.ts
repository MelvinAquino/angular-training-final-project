import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Login } from '../login/login-model';
import { Subject } from 'rxjs';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  onHttpLogin = new Subject();
  isLogged = new Subject();
  onHttpGetProfile = new Subject();
  onHttpUpdateProfile = new Subject();
  onHttpGetTickets = new Subject();
  onHttpGetTicketsTotal = new Subject();
  onHttpGetTicketDetails = new Subject();
  dynamicTitle = new Subject();

  constructor(private _http: HttpClient) { }

  httpLogin(logins: Login) {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/auth/login';

    this._http.post(url, logins).subscribe(
      (response:any) => {
        if(response.status === 'success'){
          this.onHttpLogin.next(response.data);
          this.isLogged.next(true);
          this.alertWithSuccess('Logged in Successfully!');
        }
      },
      (error) => {
        console.log("error response", error);
      }
    );
  }

  setToken(token: string): void{
    localStorage.setItem('token', token);
  }

  getToken(): string{
    const token = localStorage.getItem('token');
    return token?.toString() || '';
  }

  checkLogStatus(): void {
    const token = localStorage.getItem('token');

    if(token) {
      this.isLogged.next(true);
    } else {
      this.isLogged.next(false);
    }
  }

  deleteToken(): void {
    localStorage.removeItem('token');
    this.isLogged.next(false);
    this.alertWithSuccess('Logged out Successfully!');
  }

  httpGetProfile(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();

    this._http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response:any) => {
        if(response.status === 'success'){
          this.onHttpGetProfile.next(response.data);
        }
      },
      (error) => {
        console.log("error response", error);
      }
    )
  }

  httpGetMyTickets(): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my?exclude_signature=1';
    const token = this.getToken() || "123";

    this._http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response:any) => {
        if(response.status === 'success'){
          this.onHttpGetTickets.next(response.data);
          this.onHttpGetTicketsTotal.next(response.total);
        }
      },
      (error) => {
        this.alertWithError(error.error.message);
        console.log("error response", error);
      }
    )
  }

  httpGetTicketDetails(id:string): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/tickets/my/'+id;
    const token = this.getToken();

    this._http.get(url, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response:any) => {
        console.log('ticket details',response);
        if(response.status === 'success'){
          this.onHttpGetTicketDetails.next(response.data);
        }
      },
      (error) => {
        console.log("error response", error);
      }
    )
  }

  httpUpdateProfile(data:any): void {
    const url = 'https://stage-api-ubertickets.cloudstaff.com/v1/users/my';
    const token = this.getToken();
    this._http.put(url, data, {
      headers: new HttpHeaders().set('Authorization', 'Bearer '+token)
    }).subscribe(
      (response: any) => {
        if(response.status === 'success') {
          this.onHttpUpdateProfile.next(response.data);
          this.onHttpGetProfile.next(response.data);
          this.alertWithSuccess("Successfully updated");
        }
      },
      (error) => {
        console.log("error response", error);
      }
    )
  }

  alertWithSuccess(message:string){
    swal.fire({
      icon: 'success',
      title: message,
    })
  }

  alertWithError(message:string){
    swal.fire({
      icon: 'error',
      title: 'An Error Occured',
      text: message,
    })
  }

}
