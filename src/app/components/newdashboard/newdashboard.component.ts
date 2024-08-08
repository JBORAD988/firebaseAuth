import {AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {UserModel} from "../../models/user.model";
import {NgToastService} from "ng-angular-popup";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication.service";
import {DataService} from "../../services/data.service";
import {NgxSpinnerService} from "ngx-spinner";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource, } from "@angular/material/table";
import {user} from "@angular/fire/auth";

@Component({
  selector: 'app-newdashboard',
  templateUrl: './newdashboard.component.html',
  styleUrls: ['./newdashboard.component.scss']
})
export class NewdashboardComponent implements OnInit, AfterViewInit {


  displayedColumns = ['fullname', 'email', 'phone', 'role', 'action'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort) sort!: MatSort



  users: any[] = [];
  oldUserData: any;

  UserDetails: UserModel ={
    isEdit: true,
    id: '',
    username:'',
    firstname: '',
    lastname: '',
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
    this.dataSource.sort = this.sort;
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
      isEdit: true,
      id: userObj.id,
      username: userObj.username,
      firstname: userObj.firstname,
      lastname: userObj.lastname,
      email: userObj.email,
      role: userObj.role,
    };
    this.users.forEach((e: UserModel) => (e.isEdit = false));
    userObj.isEdit = true;
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
}
