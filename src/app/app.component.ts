import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'final-activity';
  public constructor(private titleService: Title) { }

  public setTitle(newTitle: string) {
    const extraTitle = this.titleService.getTitle()
    // this.title = 'final-activity | '+extraTitle;
  }
}
