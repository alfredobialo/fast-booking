import {Component, inject, OnInit} from "@angular/core";
import {UserManagerService} from "./user-manager-service";

@Component({
  template: `
    <h3>All Users</h3>
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
          <td><a href="mailto:{{user.email}}" target="_blank" ><sup style="color:red"><span class="fa fa-mail-forward"></span></sup> &nbsp;&nbsp;
      {{user.email}}</a></td>
        </tr>
      }

      </tbody>
    </table>

  `,
  standalone:true,
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

  `]
})
export class UserListComponent implements OnInit {
  private userManager = inject(UserManagerService);
  userData : any[]  = [];
  ngOnInit(): void {
    const dataResponse = this.userManager.getUsers();
    this.userData = dataResponse.data;
    console.log(dataResponse);
  }

}
