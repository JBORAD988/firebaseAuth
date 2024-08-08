import { Component } from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgIf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-ghostforgot',
  standalone: true,
  templateUrl: './ghostforgot.component.html',
  imports: [
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    NgIf,
    ReactiveFormsModule
  ],
  styleUrls: ['./ghostforgot.component.scss']
})
export class GhostforgotComponent {

}
