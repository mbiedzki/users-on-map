import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { HttpService} from '../../http.service';
import {MatSelectChange} from '@angular/material/select';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm = this.fb.group({
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    email: [null, Validators.required],
    voivodeship: [null, Validators.required],
    district: [{value: null, disabled: true}, Validators.required],
    community: [{value: null, disabled: true}, Validators.required],
    town: [{value: null, disabled: true}, Validators.required],
    street: [{value: null, disabled: true}, Validators.required],
    zip: [{value: null, disabled: true}, Validators.required],
    number: [{value: null, disabled: true}, Validators.required]
  });
  message = '';

  body = [];

  streetInput = new FormControl({value: null, disabled: true}, Validators.required);

  voivodeships = [];
  districts = [];
  communities = [];
  towns = [];
  zips = [];
  streets = [];
  numbers = [];

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialog,
    private httpService: HttpService,
    public dialogRef: MatDialogRef<UserFormComponent>
  ) {}

  ngOnInit(): void {
    this.body = [
      {
        level: 'woj',
        q: ''
      }];
    this.httpService.getVoivodeships(this.body)
      .then(response => {
        if (response) {
          this.message = '';
          this.voivodeships = response;
        }
      })
      .catch((error) => {
        this.message = 'Błąd pobrania listy województw';
      });
    }

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
        v: this.userForm.controls.zip.value
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

  handleVoivodeshipChange(value: MatSelectChange): any {
    if (value) {
      this.body = [
        {
          level: 'woj',
          v: this.userForm.controls.voivodeship.value
        },
        {
          level: 'pow',
          q: ''
        }
      ];
      this.httpService.getDistricts(this.body)
        .then(response => {
          if (response) {
            this.message = '';
            this.districts = response;

            this.userForm.controls.district.reset();
            this.userForm.controls.community.reset();
            this.userForm.controls.town.reset();
            this.streetInput.reset();
            this.userForm.controls.zip.reset();
            this.userForm.controls.number.reset();
            this.streets = [];

            this.userForm.controls.district.enable();
            this.userForm.controls.community.disable();
            this.userForm.controls.town.disable();
            this.streetInput.disable();
            this.userForm.controls.zip.disable();
            this.userForm.controls.number.disable();

            this.communities = [];
          }
        })
        .catch((error) => {
          this.message = 'Błąd pobrania listy powiatów';
        });
    }
  }

  handleDistrictChange(value: MatSelectChange): any {
    if (value) {
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
          q: ''
        }
      ];
      this.httpService.getCommunities(this.body)
        .then(response => {
          if (response) {
            this.message = '';
            this.communities = response;

            this.userForm.controls.community.reset();
            this.userForm.controls.town.reset();
            this.streetInput.reset();
            this.userForm.controls.zip.reset();
            this.userForm.controls.number.reset();
            this.streets = [];

            this.userForm.controls.community.enable();
            this.userForm.controls.town.disable();
            this.streetInput.disable();
            this.userForm.controls.zip.disable();
            this.userForm.controls.number.disable();

          }
        })
        .catch((error) => {
          this.message = 'Błąd pobrania listy gmin';
        });
    }
  }

  handleCommunityChange(value: MatSelectChange): any {
    if (value) {
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
          q: ''
        }
      ];
      this.httpService.getTowns(this.body)
        .then(response => {
          if (response) {
            this.message = '';
            this.towns = response;

            this.userForm.controls.town.reset();
            this.streetInput.reset();
            this.userForm.controls.zip.reset();
            this.userForm.controls.number.reset();
            this.streets = [];

            this.userForm.controls.town.enable();
            this.streetInput.disable();
            this.userForm.controls.zip.disable();
            this.userForm.controls.number.disable();
          }
        })
        .catch((error) => {
          this.message = 'Błąd pobrania listy miejscowości';
        });
    }
  }
  handleTownChange(value: MatSelectChange): any {
    if (value) {
      this.streetInput.reset();
      this.userForm.controls.zip.reset();
      this.userForm.controls.number.reset();
      this.streets = [];

      this.streetInput.enable();
      this.userForm.controls.zip.disable();
      this.userForm.controls.number.disable();
    }
  }

  handleStreetChange(value: Event): any {
    if (this.streetInput.value.length >= 3) {
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
          q: this.streetInput.value
        }
      ];
      this.httpService.getStreets(this.body)
        .then(response => {
          if (response) {
            this.message = '';
            this.streets = response;

            this.userForm.controls.zip.reset();
            this.userForm.controls.number.reset();

            this.userForm.controls.zip.disable();
            this.userForm.controls.number.disable();
          }
        })
        .catch((error) => {
          this.message = 'Błąd pobrania listy ulic';
        });
    }
  }

  handleStreetSelectionChange(value: MatAutocompleteSelectedEvent): any {
    if (value) {
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
          v: this.streetInput.value
        },
        {
          level: 'kod',
          q: ''
        }
      ];
      this.httpService.getZips(this.body)
        .then(response => {
          if (response) {
            this.message = '';
            this.zips = response;

            this.userForm.controls.zip.reset();
            this.userForm.controls.number.reset();
            this.userForm.controls.zip.enable();
            this.userForm.controls.number.disable();
          }
        })
        .catch((error) => {
          this.message = 'Błąd pobrania listy kodów';
        });
    }
  }

  handleZipChange(value: MatSelectChange): any {
    if (value) {
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
          v: this.streetInput.value
        },
        {
          level: 'kod',
          v: this.userForm.controls.zip.value
        },
        {
          level: 'nr',
          q: ''
        }
      ];
      this.httpService.getNumbers(this.body)
        .then(response => {
          if (response) {
            this.message = '';
            this.numbers = response;

            this.userForm.controls.number.reset();
            this.userForm.controls.number.enable();
          }
        })
        .catch((error) => {
          this.message = 'Błąd pobrania listy kodów';
        });
    }
  }
}
