import { Component, OnInit } from '@angular/core';
import {UserListService} from './user-list.service';
import {User} from './user';
import {MatDialog} from '@angular/material/dialog';
import {UserFormComponent} from '../user-form/user-form.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  columnsToDisplay: string[] = ['lastName', 'firstName', 'town', 'email'];
  public usersList: Array<User>;

  openForm(): any {
    const dialogRef = this.dialog.open(UserFormComponent, {
      height: '530px',
      width: '600px',
    });
  }

  constructor(
    public userListService: UserListService,
    public dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.usersList = this.userListService.usersList;
  }

}
