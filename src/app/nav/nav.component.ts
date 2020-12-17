import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  isLogged: boolean;

  constructor(private _service: GlobalService, private route: Router) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    this._service.isLogged.subscribe(
      (logged: any) => {
        this.isLogged = logged;
      }
    );

    this._service.checkLogStatus();
  }

  onLogout(): void {
    this._service.deleteToken();
    this.route.navigate(['/login']);
  }

}
