import { Component, OnInit } from '@angular/core';
import {UserListService} from './user-list.service';
import {User} from './user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  columnsToDisplay: string[] = ['lastName', 'firstName', 'email'];
  public usersList: Array<User>;

  constructor(
    public userListService: UserListService
  ) {
  }

  ngOnInit(): void {
    this.usersList = this.userListService.usersList;
  }

}
