import { Injectable } from '@angular/core';
import {User} from './user';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  public usersList: Array<User> = [
    {
      firstName: 'Michał',
      lastName: 'Biedzki',
      email: 'mbiedzki@gmail.com',
      voivodeship: '',
      district: '',
      community: '',
      town: 'Warszawa',
      street: '',
      zip: '',
      number: '',
      longitude: 52.202741,
      latitude: 21.015057
    },
    {
      firstName: 'Jan',
      lastName: 'Kowalski',
      email: 'jan.kowalski@gmail.com',
      voivodeship: '',
      district: '',
      community: '',
      town: 'Poznań',
      street: '',
      zip: '',
      number: '',
      longitude: 52.401666,
      latitude: 16.911550
    }
  ];
  constructor() {}
}
