import { Injectable } from '@angular/core';
import {Observable, map} from "rxjs";
import {UserModel} from "../models/user.model";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/compat/firestore";
import {NgToastService} from "ng-angular-popup";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
// import {Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc} from '@angular/fire/firestore'
// import * as firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: AngularFirestore, private toast:NgToastService ,private route: Router) { }

  getAllData(): Observable<UserModel[]> {
    return this.firestore.collection<UserModel>('Employee details').valueChanges();
  }

  getDataFromFirestore(): Observable<any[]> {

    return this.firestore.collection('Employee details/employee/alluserdata').snapshotChanges().pipe(
      map(action => {
        return action.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return {id, data}
        })
      })
    )
  }


  getUser(id: string): Observable<any> {
    return this.firestore.collection('Employee details/employee/alluserdata').doc(id).snapshotChanges().pipe(
      map(action => {
        const data = action.payload.data();
        return data;
      })
    );
  }



  sendUserdata(newData:any){

    // console.log(newData)
    this.firestore.collection('Employee details').doc('employee').collection('alluserdata').add(newData).then((data)=>{
      console.log(data);
      this.route.navigate(['newlogin']);
      localStorage.removeItem('uid')

    })
  }

  deleteUser(id:any){
    this.firestore.collection('Employee details').doc('employee').collection('alluserdata').doc(id).delete().then(()=> {
      console.log("Data Deleted");
      this.toast.success({detail:"Delete Data Successfully", summary:"User deleted successfully", duration: 5000})
    },error=>{
      this.toast.success({detail:"Delete Data Successfully", summary:error.message, duration: 5000})
    })
  }

  onUpdateUser(data: any, id:any){
    debugger
    this.firestore.collection('Employee details').doc('employee').collection('alluserdata').doc(id).update(data).then(()=>{
      console.log('data is edited')
      this.route.navigate(['newdashboard'])
    }).catch(error =>{
      console.error("Error edited:", error)
    })
  }

}
