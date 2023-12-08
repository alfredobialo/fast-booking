import {Component, inject, OnInit} from "@angular/core";
import {UserManagerService} from "./user-manager-service";
import {DropdownModule} from "primeng/dropdown";
import {InputGroupModule} from "primeng/inputgroup";
import {ButtonModule} from "primeng/button";
import {MultiSelectModule} from "primeng/multiselect";
import {FormsModule} from "@angular/forms";

@Component({
  template: `
    <h1 class="font-light">Prime NG</h1>
    <p-button type="primary">Hello Button</p-button>
   <div class="py-3.5">
     <p-button label="Submit" [loading]="loading" (onClick)="load()"></p-button>
     <p-button label="Loading custom icon" [loading]="loading" loadingIcon="pi pi-bell" (onClick)="load()"></p-button>
   </div>
    <p-multiSelect
      emptyMessage="No Item"
      [options]="['Apples', 'Oranges', 'Mangoes']" ></p-multiSelect>
    <h3>All Users</h3>

    <div class="py-2.5">
      <!--<p-editor [(ngModel)]="text" [style]="{ height: '320px' }"></p-editor>-->
    </div>
    <hr>
    <table cellpadding="15px" cellspacing="0" border="0" class="table table-borderless user-list-table">
      <thead class="table-header-group">
      <tr class="bg-blend-hard-light ">
        <th><span class="fa-user fa"></span> S/N</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      @for(user of userData; track user.id){
      <tr [class]="{'bg-gray-700 text-gray-50' : $odd}" class="table-row">
          <td>{{$index + 1}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td><a href="mailto:{{user.email}}" target="_blank" ><sup style="color:red">
            <span class="fa fa-mail-reply"></span>
          </sup> &nbsp;&nbsp;
      {{user.email}}</a></td>
        </tr>
      }

      </tbody>
    </table>

  `,
  standalone:true,
  imports: [DropdownModule, InputGroupModule, ButtonModule, MultiSelectModule, FormsModule,],
  selector:"fb-user-list",
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
export class UserListComponent implements OnInit {
  private userManager = inject(UserManagerService);
  userData : any[]  = [];
  text ="Hello Text Editor";
  loading: boolean = false;
  ngOnInit(): void {
    const dataResponse = this.userManager.getUsers();
    this.userData = dataResponse.data;
    console.log(dataResponse);
  }

  load() {
    this.loading = !this.loading;
    console.log("Load Called");
  }
}
