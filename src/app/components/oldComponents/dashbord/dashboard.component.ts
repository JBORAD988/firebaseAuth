import {AfterViewInit, Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../../models/user.model";
import {AuthenticationService} from "../../../services/authentication.service";
import {DataService} from "../../../services/data.service";
import {NgxSpinner, NgxSpinnerService} from "ngx-spinner";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {

  users: any[] = [];
  oldUserData: any;

  UserDetails: UserModel ={
    firstname: '',
    lastname: '',
    city:'',
    phone:'',
    email: '',
    role: '',
  }

  public fullName: string = "";

  constructor(


    private toast: NgToastService,
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private _httpClient: HttpClient,
    private auth: AuthenticationService,
    private dataservice: DataService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit() {
    // this.dataservice.getAllData().subscribe((data: UserModel[]) => {
    //   this.users = data
    //   console.log(this.users)
    // });
    this.getData()
  }



  getData() {
    this.dataservice.getDataFromFirestore().subscribe((data: UserModel[]) => {
      this.users = data
      console.log(data);
    });
  }

  ngAfterViewInit(): void {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
  }

  getUser(){

  }


  private setupBurgerMenu() {
    const burger = this.el.nativeElement.querySelector('.burger');
    const overlay = this.el.nativeElement.querySelector('.overlay');
    const nav = this.el.nativeElement.querySelector('nav');
    const body = document.body;

    burger.addEventListener('click', () => {
      this.renderer.addClass(burger, 'clicked');
      this.renderer.addClass(overlay, 'show');
      this.renderer.addClass(nav, 'show');
      this.renderer.addClass(body, 'overflow');
    });

    overlay.addEventListener('click', () => {
      this.renderer.removeClass(burger, 'clicked');
      this.renderer.removeClass(overlay, 'show');
      this.renderer.removeClass(nav, 'show');
      this.renderer.removeClass(body, 'overflow');
    });
  }

  // onEdit(userObj: any) {
  //   this.oldUserData = JSON.stringify(userObj);
  //   this.users.forEach((e: any) => e.isEdit = false);
  //   userObj.isEdit = true;
  // }

  onEdit(userObj: UserModel) {
    this.oldUserData = JSON.stringify(userObj);
    this.UserDetails = {
      firstname: userObj.firstname,
      lastname: userObj.lastname,
      phone: userObj.phone,
      city: userObj.city,
      email: userObj.email,
      role: userObj.role,
    };
  }


  Savedata(emp: any) {
    this.users.forEach((e: any) => e.isEdit = false);
    console.log(emp);
  }

  OnCancel(obj: any) {
    const oldData = JSON.parse(this.oldUserData);
    obj.username = oldData.username;
    obj.firstName = oldData.firstName;
    obj.lastName = oldData.lastName;
    obj.email = oldData.email;
    obj.role = oldData.role;
    obj.isEdit = false;
  }

  onDeleteClick(id: string): void {
    this.dataservice.deleteUser(id)
  }

  private handleDeleteSuccess() {
    console.log('User deleted successfully');
    this.toast.success({detail:"Delete Successfully", summary:"User deleted successfully", duration: 5000})
    this.router.navigate(['/dashboard']).then((r) => true);
    this.getUser()
  }

  private handleDeleteError(error: any) {
    console.error('Error deleting employee:', error);
    this.toast.success({detail:"Updated", summary:"User updated successfully:", duration: 5000})
  }




  updateData() {

  }

  getRoleFullName(roleValue: string): string {
    const role = this.roles.find(item => item.value === roleValue);
    return role ? role.viewValue : '';
  }


  roles = [
    { value: 'HR', viewValue: 'HR' },
    { value: 'ANG', viewValue: 'Angular Developer' },
    { value: 'NET', viewValue: '.NET Developer' },
    {value: 'ADM', viewValue: 'Admin'},
    {value: 'FIN', viewValue: 'Accounting'},
    {value: 'BDE', viewValue: 'Business Development'},
    {value: 'REC', viewValue: 'React js'},
    {value: 'FS', viewValue: 'Full-Stack'},
    {value: 'SUDO' , viewValue: 'Founders'},
  ];

  gettokendata(){
    // return localStorage.getItem('id')
   return  console.log(localStorage.getItem('id'))

  }

  protected readonly user = user;
}

