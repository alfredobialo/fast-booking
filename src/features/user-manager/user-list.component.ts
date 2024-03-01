
import {ChangeDetectionStrategy, Component, inject, Signal} from "@angular/core";
import {DropdownModule} from "primeng/dropdown";
import {InputGroupModule} from "primeng/inputgroup";
import {ButtonModule} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";
import {CounterStore} from "../counter/counterStore";
import {ProgressBarModule} from "primeng/progressbar";
import {UserStore} from "./userStore";
import {UserDataModel} from "../model/ApiResponseModel";

@Component({
  imports: [DropdownModule, InputGroupModule, ButtonModule, MultiSelectModule, FormsModule, ProgressBarModule,],
  template: `
    <h1 class="text-green-600 text-5xl font-extrabold p-3 ">Prime NG</h1>

    <div class="my-3 d-flex justify-content-between">
      <p-button label="Submit" (onClick)="load()"></p-button>
      <p-button label="Loading custom icon" [loading]="processing()" loadingIcon="pi pi-bell" (onClick)="load()"></p-button>
    </div>
    <p-multiSelect [panelStyle]="{minWidth : '300px'}" [style]="{minWidth : '300px'}"
                   [showClear]="true"
      emptyMessage="No Item" [display]="'chip'" placeholder="Select Fruits"
      [options]="['Apples', 'Oranges', 'Mangoes','Cucumber','Pineapple', 'Gauva', 'Cheeries']"></p-multiSelect>
    <h3 class="my-5">All Users</h3>
    @if(processing()){
      <div> <p-progressBar mode="indeterminate" [style]="{height:'6px'}"></p-progressBar></div>
    }
    <div class="py-2.5">
      <!--<p-editor [(ngModel)]="text" [style]="{ height: '320px' }"></p-editor>-->
    </div>
    <hr>
    <table cellpadding="15px" cellspacing="0" border="0" class="table table-borderless user-list-table table-hover">
      <thead class="">
      <tr class="bg-primary-subtle ">
        <th><span class="fa-user fa"></span> S/N</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email <span class="text-success">'Counter * 2' :{{ counter() }}</span></th>
      </tr>
      </thead>
      <tbody>
        @for (user of userData(); track user.id) {
          <tr [class]="{'bg-green-400':$odd}" class="table-row">
            <td>{{ $index + 1 }}</td>
            <td>{{ user.firstName }}</td>
            <td>{{ user.lastName }}</td>
            <td><a href="mailto:{{user.email}}" target="_blank"><sup style="color:red">
              <span class="fa fa-mail-reply"></span>
            </sup> &nbsp;&nbsp;
              {{ user.email }}</a></td>
          </tr>
        }

      </tbody>
    </table>

  `,
  standalone: true,
  changeDetection:ChangeDetectionStrategy.OnPush,
  selector: "fb-user-list",
  styles: [`

    table.user-list-table td {
      min-width: 20%;
      text-align: left;
    }

    table.user-list-table th {
      text-align: left;
      color: #0c5682;
    }

    table.user-list-table {
      margin: 1.5rem 0;
    }

    .bg-gray {
      background-color: rgba(230, 227, 227, 0.72);
    }

  `],
})
export class UserListComponent  {

  counter = inject(CounterStore).doubleCounter;
  userStore =  inject(UserStore);
  userData:Signal<UserDataModel[]> = this.userStore.users;
  processing = this.userStore.processing;
  criteria = this.userStore.requestCriteria;
  userApiResponse = this.userStore.userDataResponse;


  load() {
    this.userStore.setCriteria({ sortBy : "name desc, thenBy email asc", currentPage : 1, pageSize : 20});
    this.userStore.getUsers(this.criteria);
    console.log("Load Called");
  }
}
