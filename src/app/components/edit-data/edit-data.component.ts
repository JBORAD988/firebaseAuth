import {AfterViewInit, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../models/user.model";
import {DataService} from "../../services/data.service";
import {AuthenticationService} from "../../services/authentication.service";
import Swal from 'sweetalert2'
import {NgxSpinnerService} from "ngx-spinner";

@Component({
  selector: 'app-edit-data',
  templateUrl: './edit-data.component.html',
  styleUrls: ['./edit-data.component.scss']
})
export class EditDataComponent implements OnInit, AfterViewInit{

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private dataservice: DataService,private auth: AuthenticationService, private router: Router, private spinner: NgxSpinnerService) {
  }

  hide = true
  userdataid: any


  EditForm: UserModel ={
    firstname:'',
    lastname:'',
    phone:'',
    city: '',
    email:'',
    role:''
  }


  ngAfterViewInit(): void {
    // this.dataSource.sort=this.sort
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);

  }


  ngOnInit() {
    this.route.paramMap.subscribe( params=>{
      const id = params.get('id');
      if (typeof id === "string") {
        localStorage.setItem("userdataid", id)
        this.userdataid = localStorage.getItem("userdataid")
      }
      this.getData(id)
    })

  }


  goback(){
    this.router.navigate(['newdashboard'])
    localStorage.removeItem('userdataid')
  }


  getData(id:any) {
    this.dataservice.getUser(id).subscribe((data) => {
      this.EditForm = data
      // this.dataSource = new MatTableDataSource(data)
      console.log(data);
    });
  }

  updateEmployee() {
    const tempuid = localStorage.getItem('userdataid')
    Swal.fire({
      title: "Is You Request For Update?",
      text: "You will update it later",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#224abe",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Update it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataservice.onUpdateUser(this.EditForm, tempuid)
        // this.auth.deleteUser(uid)
        Swal.fire({
          title: "Updated!",
          text: "Your file has been Updated.",
          icon: "success"
        });
        this.router.navigate(['newdashboard'])
      }
    });

  }




  delete(){
    this.onDeleteClick(this.userdataid, this.userdataid)

}



  onDeleteClick(id: string, uid:any): void {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#224abe",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.dataservice.deleteUser(id)
        // this.auth.deleteUser(uid)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.router.navigate(['newdashboard'])
      }
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
