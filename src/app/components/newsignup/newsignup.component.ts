import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgToastService} from "ng-angular-popup";
import {AuthenticationService} from "../../services/authentication.service";
import {AppModule} from "../../app.module";
import {NgxSpinnerService} from "ngx-spinner";
import {DataService} from "../../services/data.service";
import { switchMap } from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-newsignup',
  templateUrl: './newsignup.component.html',
  styleUrls: ['./newsignup.component.scss']
})
export class NewsignupComponent implements OnInit ,AfterViewInit{


  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  hide = true
  uid:string = ''


  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private route: Router, private toast: NgToastService, private auth:AuthenticationService, private spinner: NgxSpinnerService
              ,private dataservice: DataService
  ) {
  }

  ngAfterViewInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phone: ['', Validators.required],
      city:['',Validators.required],
      role:['',Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      userid:['']
    })
  }

  hideShowPass() {
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"

  }

  // onSingup() {
  //
  //   this.dataservice.sendUserdata({
  //     firstname: this.signUpForm.value.firstName,
  //     lastname: this.signUpForm.value.lastName,
  //     phone: this.signUpForm.value.phone,
  //     city: this.signUpForm.value.city,
  //     role:this.signUpForm.value.role,
  //     email:this.signUpForm.value.email,
  //     userid:localStorage.getItem('uid')
  //
  //   })
  //
  //   console.log(this.signUpForm.value);
  //   this.auth.signUp({
  //     Email: this.signUpForm.value.email,
  //     password: this.signUpForm.value.password
  //   }).subscribe((userCredential)=>{
  //      this.uid = userCredential.user.uid
  //     localStorage.setItem('uid',this.uid)
  //     this.toast.success({detail: "SUCCESS", summary: "USer Created Successfully ", duration: 5000})
  //
  //   },error => {
  //     console.error(error)
  //     this.toast.warning({detail: "Error", summary: error.message, duration: 5000})
  //   })
  //   console.log('register Success')
  //
  //
  // }



  onSingup() {


    this.auth.signUp({
      Email: this.signUpForm.value.email,
      password: this.signUpForm.value.password
    }).subscribe((userCredential)=>{
      this.uid = userCredential.user.uid;
      localStorage.setItem('uid',this.uid);
      this.toast.success({detail: "SUCCESS", summary: "User Created Successfully ", duration: 5000});

      // Call sendUserData after successful sign-up
      this.dataservice.sendUserdata({
        firstname: this.signUpForm.value.firstName,
        lastname: this.signUpForm.value.lastName,
        phone: this.signUpForm.value.phone,
        city: this.signUpForm.value.city,
        role: this.signUpForm.value.role,
        email: this.signUpForm.value.email,
        userid: localStorage.getItem('uid')
      })
    }, error => {
      console.error(error);
      this.toast.warning({detail: "Error", summary: error.message, duration: 5000});
    });
  }



roles = [
    {value: 'HR', viewValue: 'HR'},
    {value: 'ANG', viewValue: 'Angular Developer'},
    {value: 'NET', viewValue: '.NET Developer'},
    {value: 'ADM', viewValue: 'Admin'},
    {value: 'FIN', viewValue: 'Accounting'},
    {value: 'BDE', viewValue: 'Business Development'},
    {value: 'REC', viewValue: 'React js'},
    {value: 'FS', viewValue: 'Full-Stack'},
    {value: 'SUDO', viewValue: 'Founders'},
  ];
}
