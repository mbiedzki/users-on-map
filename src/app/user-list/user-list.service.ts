import {Injectable} from '@angular/core';
import {User} from './user';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserListService {
  public usersList: Array<User> = [
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
    },
    {
      firstName: 'Zbigniew',
      lastName: 'Nowak',
      email: 'z.nowak@gmail.com',
      voivodeship: '',
      district: '',
      community: '',
      town: 'Gdańsk',
      street: '',
      zip: '',
      number: '',
      longitude: 54.355532,
      latitude: 18.644489
    }
  ];
  public getUsersList(): any {
    return new Observable(observer => {
      observer.next(this.usersList);
    });
  }
  public updateUsersList(user): any {
    return new Observable(observer => {
      this.usersList.push(user);
      observer.next(this.usersList);
    });
  }
  constructor() {}
}
