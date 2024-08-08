import {Component, OnInit} from '@angular/core';
import Validateform from "../../helper/validateform";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NgToastService} from "ng-angular-popup";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit{


  type: string = "password"
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  hide = true


  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private route : Router , private toast: NgToastService) {
  }

  ngOnInit() {
    this.signUpForm = this.fb.group({
      firstName: ['',Validateform.name],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      Email: ['',Validators.required],
      Role:['Admin'],
      password: ['',Validators.required],
    })
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type = "text" : this.type = "password"

  }

  onSingup() {
    // if (this.signUpForm.valid) {
    //   // Perform logic for signup
      console.log(this.signUpForm.value);
    //
    //   this.auth.signUp(this.signUpForm.value).subscribe(
    //     (res: any) => {
    //       // alert(res.message);
          this.toast.success({detail:"SUCCESS", summary:"res.message", duration:5000})
    //
    //       this.signUpForm.reset();
          this.route.navigate(['login']);
    //     },
    //     (error) => {
    //       if (error.error && error.error.message) {
    //         // alert(error.error.message);
    //         this.toast.error({detail:"Error",summary:error.error.message, duration:5000})
    //       } else {
    //         this.toast.error({detail:"Error undefined", summary:"An error occurred during signup", duration:5000})
    //       }
    //     }
    //   );
    // } else {
    //   // Logic for validation check
    //   console.log('Form invalid');
    //   Validateform.validateAllFormFileds(this.signUpForm);
    //   this.toast.warning({detail:"Form Invalid", summary:"Fill-up the all Details", duration: 5000})
    // }


  }

  roles = [
    { value: 'HR', viewValue: 'HR' },
    { value: 'ANG', viewValue: 'Angular Developer' },
    { value: 'NET', viewValue: '.NET Developer' },
    {value: 'ADM ', viewValue: 'Admin'},
    {value: 'FIN ', viewValue: 'Accounting'},
    {value: 'BDE ', viewValue: 'Business Development'},
    {value: 'REC ', viewValue: 'React js'},
    {value: 'FS ', viewValue: 'Full-Stack'},
    {value: 'SUDO' , viewValue: 'Founders'},
  ];


}
