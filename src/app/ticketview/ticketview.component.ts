import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { Router, Params, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ticketview',
  templateUrl: './ticketview.component.html',
  styleUrls: ['./ticketview.component.css']
})
export class TicketviewComponent implements OnInit {
  isLogged: boolean;
  id: string;
  ticket:any;

  constructor(private _service: GlobalService, private route: Router, private _activatedRoute: ActivatedRoute) {
    this.isLogged = false;
    this.id = '';
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

    this._activatedRoute.params.subscribe(
      (params: Params) => {
        this.id = params.id;

      }
    );

    this._service.httpGetTicketDetails(this.id);

    this._service.onHttpGetTicketDetails.subscribe(
      (ticketDetails: any) => {
        this.ticket = ticketDetails;
      }
    )
  }

}
