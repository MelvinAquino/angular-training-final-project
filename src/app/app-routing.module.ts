import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TicketsComponent } from './tickets/tickets.component';
import { AboutComponent } from './about/about.component';
import { TwoColumnComponent } from './two-column/two-column.component';
import { LoginComponent } from './login/login.component';
import { TicketviewComponent } from './ticketview/ticketview.component';
import { MyprofileComponent } from './myprofile/myprofile.component';

const routes: Routes = [
  { path: '', component: TwoColumnComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'tickets', component: TicketsComponent },
      { path: 'ticket/:id/view', component: TicketviewComponent },
      { path: 'myprofile', component: MyprofileComponent }
    ]
  },
  { path: 'about-us', component: AboutComponent, data :{ title: 'About us'}},
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
