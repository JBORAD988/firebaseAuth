import { Component } from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private  toast : NgToastService , private auth: AuthenticationService, private router: Router) {
  }


  logout() {
    this.auth.signout()
    this.toast.info({ detail: "Logout", summary: "I hope You enjoy the session, have a nice day ", duration: 5000 });
  }

  dashboard(){
    this.router.navigate(['newdashboard'])
    localStorage.removeItem('userdataid')
  }


}
