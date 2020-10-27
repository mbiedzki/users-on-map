import { Component, OnInit } from '@angular/core';
import {UserListService} from './user-list.service';
import {User} from './user';
import {MatDialog} from '@angular/material/dialog';
import {UserFormComponent} from './user-form/user-form.component';
import {ChangeDetectorRef} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MapComponent} from '../map/map.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  usersList = new MatTableDataSource();
  columnsToDisplay: string[] = ['lastName', 'firstName', 'town', 'email'];

  openForm(): any {
    const dialogRef = this.dialog.open(UserFormComponent, {
      height: '530px',
      width: '600px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== 'no_new_user') {
        this.userListService.updateUsersList(result).subscribe((usersListData: User[]) => {
          this.usersList.data = usersListData;
          this.mapComponent.updateUserLayer();
        });
      }
    });
  }

  constructor(
    public userListService: UserListService,
    public dialog: MatDialog,
    public cdRef: ChangeDetectorRef,
    public mapComponent: MapComponent
  ) {
  }

  ngOnInit(): void {
    this.userListService.getUsersList().subscribe((usersListData: User[]) => {
      this.usersList.data = usersListData;
    });
  }
}
