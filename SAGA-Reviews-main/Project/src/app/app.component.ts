import {Component} from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';
import {ThemePalette} from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { UserDetailService } from 'src/app/service/user-detail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'filmreviews';
  loading = false;
  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'indeterminate';
  value = 50;

  constructor(private router: Router, public _data: UserDetailService) {
    router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loading = true;
      } else if (event instanceof NavigationEnd) {
        setTimeout (() => {
          this.loading = false;
        }, 1000);
      }
    });
    console.log(_data);
  }

  public logOut() {
    this._data.logOutUser();
    window.location.reload();
 }

}
