import { Component, VERSION } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {UserListComponent} from "../features/user-manager/user-list.component";
import {NewsPageComponent} from "./pages/news-page";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, UserListComponent,NewsPageComponent],
  template: `
    <div class="container">
      <h1 class="text-3xl font-bold underline">Angular v{{ngVersion}}</h1>
      <div class="mb-3 row">
        <div class="col-md-8  col-sm-12 col-xl-6">
          <fb-news-page [showContent]="true" newsTitle="Learning Tailwind Css"/>
        </div>


      </div>
      <fb-user-list />
    </div>`
})
export class AppComponent {
  ngVersion = VERSION.full;
  title = 'fast-booking';
}
