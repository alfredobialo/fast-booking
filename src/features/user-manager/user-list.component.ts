
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
    <h1 class="font-light">Prime NG</h1>
    <p-button type="primary">Hello Button</p-button>
    <div class="py-3.5">
      <p-button label="Submit" [loading]="processing()" (onClick)="load()"></p-button>
      <p-button label="Loading custom icon" [loading]="processing()" loadingIcon="pi pi-bell" (onClick)="load()"></p-button>
    </div>
    <p-multiSelect
      emptyMessage="No Item" [display]="'chip'"
      [options]="['Apples', 'Oranges', 'Mangoes']"></p-multiSelect>
    <h3>All Users</h3>
    @if(processing()){
      <div> <p-progressBar mode="indeterminate" [style]="{height:'6px'}"></p-progressBar></div>
    }
    <div class="py-2.5">
      <!--<p-editor [(ngModel)]="text" [style]="{ height: '320px' }"></p-editor>-->
    </div>
    <hr>
    <table cellpadding="15px" cellspacing="0" border="0" class="table table-borderless user-list-table">
      <thead class="table-header-group">
      <tr class="bg-light ">
        <th><span class="fa-user fa"></span> S/N</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email <span class="text-success">'Counter * 2' :{{ counter() }}</span></th>
      </tr>
      </thead>
      <tbody>
        @for (user of userData(); track user.id) {
          <tr [class]="{'text-gray-700 text-gray-50' : $odd}" class="table-row">
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
    const response = this.userStore.getUsers();
    console.log("Load Called", response);
  }
}
