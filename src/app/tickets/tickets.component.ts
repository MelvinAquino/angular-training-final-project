import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  isLogged: boolean;
  myTickets:any;
  totalTickets = 0;

  constructor(private _service: GlobalService, private route: Router, private titleService: Title) {
    this.isLogged = false;
  }

  ngOnInit(): void {
    // if(!this._service.getToken()){
    //   this.route.navigate(['/']);
    // }

    this.titleService.setTitle('FinalActivity | Tickets');

    this._service.httpGetMyTickets();

    this._service.onHttpGetTickets.subscribe(
      (tickets: any) => {
        this.myTickets = tickets;
      }
    )

    this._service.onHttpGetTicketsTotal.subscribe(
      (total: any) => {
        this.totalTickets = total;
      }
    )
  }

}
