import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {AuthenticationService} from "../../services/authentication.service";
import { NgxSpinnerService } from 'ngx-spinner';
import {GoogleAuthProvider} from "firebase/auth";
import Swal from 'sweetalert2'

@Component({
  selector: 'app-newlogin',
  templateUrl: './newlogin.component.html',
  styleUrls: ['./newlogin.component.scss']
})
export class NewloginComponent implements OnInit, AfterViewInit{

  type: string = "password"
  // isText: boolean = false;
  // eyeIcon:string = 'fa-eye-slash'
  isLogginIn= false;
  isRecoveringpassword=false;

  loginForm!: FormGroup;


  constructor(private fb: FormBuilder, private toast: NgToastService, private route : Router , private auth: AuthenticationService, private spinner: NgxSpinnerService) {
  }

  ngAfterViewInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }
  ngOnInit() {
    this.loginForm = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })


  }

  loginAlert(){
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Login Successful"
    });
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
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    }).subscribe(()=>{


      this.spinner.show();
      this.auth.sendtoken()
      this.auth.setemailtoken(this.loginForm.value.email)
      this.toast.success({detail:"Login",summary:"Login successful",duration: 5000});
      // this.loginAlert()
      this.route.navigate(['newdashboard'])
      setTimeout(() => {
        /** spinner ends after 5 seconds */
        this.spinner.hide();
      }, 2000);
    },error => {
      this.isLogginIn = false
      this.toast.warning({detail:"Not Authorized",summary:error.message,duration: 5000});
    })


    console.log('register')
    // console.log(this.loginForm.value)

    // this.route.navigate(['dashboard'])

  }

  // loginwithGoogle(){
  //   this.auth.signInWithGoogle()
  //
  // }
  GoogleAuth() {
    this.auth.AuthLogin(new GoogleAuthProvider())
      .then(user => {
        // Handle successful login
        console.log('Logged in user:', user);
      })
      .catch(error => {
        // Handle login error
        console.error('Login error:', error);
      });
  }


  // GoogleAuth() {
  //   return this.auth.AuthLogin(new GoogleAuthProvider());
  // }



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




