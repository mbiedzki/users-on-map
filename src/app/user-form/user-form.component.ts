import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  userForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    voivodeship: [null, Validators.required],
    district: [null, Validators.required],
    community: [null, Validators.required],
    town: [null, Validators.required],
    street: [null, Validators.required],
    zip: [null, Validators.compose([
      Validators.required, Validators.minLength(5), Validators.maxLength(5)])
    ],
    number: [null, Validators.required]
  });

  voivodeships = [
    {name: 'dolnośląskie'},
    {name: 'kujawsko-pomorskie'},
    {name: 'lubelskie'},
    {name: 'lubuskie'},
    {name: 'łódzkie'},
    {name: 'małopolskie'},
    {name: 'mazowieckie'},
    {name: 'opolskie'},
    {name: 'podkarpackie'},
    {name: 'podlaskie'},
    {name: 'pomorskie'},
    {name: 'śląskie'},
    {name: 'świętokrzyskie'},
    {name: 'warmińsko-mazurskie'},
    {name: 'wielkopolskie'},
    {name: 'zachodniopomorskie'},
  ];
  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog
  ) {}
  onSubmit(): any {
    this.dialog.closeAll();
  }
  closeForm(): any {
    this.dialog.closeAll();
  }
}
