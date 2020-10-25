import { Component, OnInit } from '@angular/core';
import {User} from './user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  public usersList: Array<User>;
  columnsToDisplay: string[] = ['lastName', 'firstName', 'email'];

  constructor() {
    // @ts-ignore
    this.usersList = [
      {
        id: 1,
        firstName: 'Michał',
        lastName: 'Biedzki',
        email: 'mbiedzki@gmail.com',
        voivodeship: '',
        district: '',
        community: '',
        town: '',
        street: '',
        zip: '',
        number: '',
      },
      {
        id: 2,
        firstName: 'Jan',
        lastName: 'Kowalski',
        email: 'jan.kowalski@gmail.com',
        voivodeship: '',
        district: '',
        community: '',
        town: '',
        street: '',
        zip: '',
        number: '',
      }
    ];
  }

  ngOnInit(): void {
  }

}
