import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { HttpService} from '../../http.service';
import { UserListService} from '../user-list.service';


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
  message = '';

  body = [];

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
    public dialog: MatDialog,
    private httpService: HttpService,
    private userListService: UserListService,
    public dialogRef: MatDialogRef<UserFormComponent>
  ) {}
  onSubmit(): any {
    this.body = [
      {
        level: 'woj',
        v: this.userForm.controls.voivodeship.value
      },
      {
        level: 'pow',
        v: this.userForm.controls.district.value
      },
      {
        level: 'gmi',
        v: this.userForm.controls.community.value
      },
      {
        level: 'msc',
        v: this.userForm.controls.town.value
      },
      {
        level: 'ulc',
        v: this.userForm.controls.street.value
      },
      {
        level: 'kod',
        v: this.userForm.controls.zip.value.slice(0, 2) + '-' + this.userForm.controls.zip.value.slice(2, 5)
      },
      {
        level: 'nr',
        v: this.userForm.controls.number.value
      }
    ];
    this.httpService.getCoords(this.body)
      .then(response => {
        if (response && response.features.length > 0) {
          this.message = '';
          const user = {
            firstName: this.userForm.controls.firstName.value,
            lastName: this.userForm.controls.lastName.value,
            email: this.userForm.controls.email.value,
            voivodeship: this.userForm.controls.voivodeship.value,
            district: this.userForm.controls.district.value,
            community: this.userForm.controls.community.value,
            town: this.userForm.controls.town.value,
            street: this.userForm.controls.street.value,
            zip: this.userForm.controls.zip.value.slice(0, 2) + '-' + this.userForm.controls.zip.value.slice(2, 5),
            number: this.userForm.controls.number.value,
            longitude: response.features[0].geometry.coordinates[1],
            latitude: response.features[0].geometry.coordinates[0]
          };
          this.dialogRef.close(user);
        } else if (response.features.length === 0) {
          this.message = 'Adres nie został znaleziony, proszę sprawdzić dane';
        }
      })
      .catch(() => {
        this.message = 'Błąd połączenia z serwerem';
      });
  }
  closeForm(): any {
    this.dialogRef.close('no_new_user');
  }
}
