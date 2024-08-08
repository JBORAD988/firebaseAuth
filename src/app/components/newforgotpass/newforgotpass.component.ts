import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import {NgxSpinnerService} from "ngx-spinner";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-newforgotpass',
  templateUrl: './newforgotpass.component.html',
  styleUrls: ['./newforgotpass.component.scss']
})
export class NewforgotpassComponent  implements OnInit ,AfterViewInit{

  hide = true;
  isRecoveringpassword = false;
  ForgotForm!: FormGroup;
constructor(private  fb:FormBuilder, private toast: NgToastService, private route : Router , private auth: AuthenticationService, private spinner: NgxSpinnerService) {
}

  ngAfterViewInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit() {
    this.ForgotForm = this.fb.group({
      email:['',Validators.required]
    })
  }

  getErrorMessage() {
    return this.ForgotForm.hasError('required') ? 'You must enter a value' :
      this.ForgotForm.hasError('email') ? 'Not a valid email' :
        '';
  }


  recoverPassword(){

    this.isRecoveringpassword=true;

    this.auth.recoverpass(this.ForgotForm.value.email).subscribe(()=>{
      this.toast.info({detail:'recovery Email has been sent', summary:'A recovery Email hase been sent to your User Email',duration: 5000})
      this.route.navigate(['newlogin'])
      this.isRecoveringpassword = false
    })
  }
}
