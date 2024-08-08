import { Injectable } from '@angular/core';
import {from, Observable, of} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import Swal from 'sweetalert2'



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  constructor(private authfire: AngularFireAuth , private route: Router, private firestore: AngularFirestore) { }


  signIn(params:SignIn): Observable<any> {
    return from(this.authfire.signInWithEmailAndPassword(
      params.email , params.password
    ))

  }

  signUp(user:SignUp): Observable<any>{

    return from(this.authfire.createUserWithEmailAndPassword(user.Email , user.password))
  }


  sendtoken() {
    const length = 32
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@~#$%^&*()_+|}{:;<>?';
    let token = '';
    for (let i = 0; i < length; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    localStorage.setItem("token", token)

  }
  setemailtoken(email:any){
    localStorage.setItem("id", email)
  }

  signout(){
    // localStorage.clear();
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    this.route.navigate(['newlogin'])

  }

  deleteUser(uid: any) {
    console.log(uid)
  }



  // chnagepass(params:SignIn): Observable<any> {
  //   return from(this.authfire.signInWithEmailAndPassword(
  //     params.email , params.password
  //   ).then(function (UserCredential){
  //     this.userCredential.user.updateEmail('newyou@domain.example')
  //   }))
  //
  // }






  // }signIn( email:string, password: string){
  //
  // }


  recoverpass(email: string):Observable<void>{

    return from(this.authfire.sendPasswordResetEmail(email))
  }

  // signInWithGoogle(){
  //   return this.authfire.signInWithPopup(new GoogleAuthProvider());
  // }

  AuthLogin(provider: any) {
    return this.authfire
      .signInWithPopup(provider)
      .then((result) => {
        console.log('You have been successfully logged in!', result.user);
        return result.user; // Return the user object
      })
      .catch((error) => {
        console.log(error);
        throw error; // Throw error for handling in the component
      });
  }

  get IsLoggedIn(){
    if (localStorage.getItem("token")){
      return true;
    }
    return false;
  }


}

type SignIn={
  email:string; password: string;
}
type SignUp={
  Email:string; password: string;
}
