import { NgModule } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatInputModule} from '@angular/material/input'
import {MatSelectModule} from "@angular/material/select";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import {MatRadioModule} from '@angular/material/radio';



@NgModule({
  declarations: [],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
  ]
})
export class MaterialModule { }
