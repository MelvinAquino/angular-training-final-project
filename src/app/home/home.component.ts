import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { GlobalService } from '../service/global.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public constructor(private titleService: Title, private _service: GlobalService) { }

  alias:any;

  ngOnInit(): void {
    this.titleService.setTitle('FinalActivity | Home');

    this._service.checkLogStatus();

    this._service.httpGetProfile();
    this._service.onHttpGetProfile.subscribe(
      (profile: any) => {
        this.alias = profile.alias;
      }
    )
  }

}
