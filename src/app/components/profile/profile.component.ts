import {AfterViewInit, Component} from '@angular/core';
import { Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {AuthenticationService} from "../../services/authentication.service";
import {NgxSpinnerService} from "ngx-spinner";
import Swal from 'sweetalert2'
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements AfterViewInit{
  constructor( private route : Router , private toast: NgToastService , private auth : AuthenticationService,private spinner: NgxSpinnerService) {
  }

  ngAfterViewInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  protected readonly localStorage = localStorage;

  resetpass(id:any){
      this.auth.recoverpass(id).subscribe(()=>{
        this.toast.info({detail:'recovery Email has been sent', summary:'A recovery Email hase been sent to your User Email',duration: 5000})
        this.spinner.show();
        setTimeout(() => {
          this.spinner.hide();
        }, 1000);
        this.route.navigate(['newlogin'])

      })
    }

}
