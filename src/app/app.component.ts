import { Component, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {UserListComponent} from "../features/user-manager/user-list.component";
import {CounterComponent} from "../features/counter/counterComponent";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent, CounterComponent],
  template: `
    <div class="container">
      <h1 class="fw-bold ">Angular v{{ngVersion}}</h1>
      <div class="row">
        <div class="col-xs-12 col-sm-5 col-lg-4 col-xl-3">
          <counter-component />
        </div>
        <div class="col-xs-12 col-sm-7 col-lg-8 col-xl-9">
          <fb-user-list />
        </div>
      </div>

    </div>`
})
export class AppComponent {
  ngVersion = VERSION.full;
  title = 'fast-booking';
}
