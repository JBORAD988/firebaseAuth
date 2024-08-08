import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  type: string = "password"
  // isText: boolean = false;
  // eyeIcon:string = 'fa-eye-slash'
  isLogginIn= false;
  isRecoveringpassword=false;

  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private toast: NgToastService, private route : Router , private auth: AuthenticationService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  // hideShowPass(){
  //   this.isText = !this.isText;
  //   this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
  //   this.isText ? this.type = "text" : this.type = "password"
  //
  // }

  onSubmit(){
    this.isLogginIn = true

    this.auth.signIn({
      email: this.loginForm.value.username,
      password: this.loginForm.value.password
    }).subscribe(()=>{
      this.route.navigate(['dashboard'])
    },error => {
      this.isLogginIn = false
    })

    console.log('register')
    console.log(this.loginForm.value)
    this.toast.success({detail:"Login",summary:"Login successful",duration: 5000});
    // this.route.navigate(['dashboard'])

  }

  recoverPassword(){
    this.isRecoveringpassword=true;

    this.auth.recoverpass(this.loginForm.value.username).subscribe(()=>{
      this.toast.info({detail:'recovery Email has been sent', summary:'A recovery Email hase been sent to your User Email',duration: 5000})
      this.isRecoveringpassword = false
    })
  }

  hide = true;
  get UserInput() { return this.loginForm.get('user'); }
  get passwordInput() { return this.loginForm.get('password'); }



}

