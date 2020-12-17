import { Component, OnInit } from '@angular/core';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  isLogged: boolean;

  constructor(private _service: GlobalService) {
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

}
