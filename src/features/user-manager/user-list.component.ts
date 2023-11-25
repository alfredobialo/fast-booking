import {Component, inject, OnInit} from "@angular/core";
import {UserManagerService} from "./user-manager-service";

@Component({
  template :`
    <h3>User List</h3>
    <hr>
    <table cellpadding="15px" cellspacing="0" border="0">
      <thead>
        <tr>
          <th>S/N</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
      @for(user of userData; track user.id){
        <tr [class]="{'bg-gray' : $odd}">
          <td>{{$index + 1}}</td>
          <td>{{user.firstName}}</td>
          <td>{{user.lastName}}</td>
          <td><a href="mailto:{{user.email}}" target="_blank" ><sup>Send Mail</sup> &nbsp; {{user.email}}</a></td>
        </tr>
      }

      </tbody>
    </table>

  `,
  standalone:true,
  selector:"fb-user-list",
  styles: [`

    td {
      min-width: 20%;
      text-align: left;
    }

    th {
      text-align: left;
      color: #0c5682;
    }

    table {
      margin: 1.5rem 0;
    }
    .bg-gray{
      background-color: rgba(208,203,182,0.66);
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
