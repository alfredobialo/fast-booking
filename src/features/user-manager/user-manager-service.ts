import {Injectable} from "@angular/core";
import {delay, of} from "rxjs";
import {IApiQueryCriteria, PagedApiResponseData, UserDataModel} from "../model/ApiResponseModel";

@Injectable({
  providedIn:'root'
})
export class UserManagerService {

  private allUsers:PagedApiResponseData<UserDataModel[]> = {
    "pageSize": 20,
    "currentPage": 1,
    "totalRecord": 21,
    "totalPages": 2,
    "data": [
      {
        "id": "000222",
        "firstName": "Abigail",
        "lastName": "Enoh",
        "email": "abigail@gmail.com"
      },
      {
        "id": "00004",
        "firstName": "Blessing",
        "lastName": "Beauty",
        "email": "blessed@gmail.com"
      },
      {
        "id": "000017",
        "firstName": "Chijioke",
        "lastName": "Juwe",
        "email": "cjuwe@gmail.com"
      },
      {
        "id": "00023",
        "firstName": "Chinaza",
        "lastName": "Onuoha David",
        "email": "chinazaonuoha@gmail.com"
      },
      {
        "id": "000221",
        "firstName": "Chinedu",
        "lastName": "Innocent",
        "email": "nedu@gmail.com"
      },
      {
        "id": "00009",
        "firstName": "Chioma",
        "lastName": "Okafor",
        "email": "chio@yahoo.com"
      },
      {
        "id": "00010",
        "firstName": "Chioma",
        "lastName": "Ukadia",
        "email": "chiomadia@yahoo.com"
      },
      {
        "id": "00008",
        "firstName": "Christian",
        "lastName": "Juwe",
        "email": "cjuwe@versaflex.com"
      },
      {
        "id": "00003",
        "firstName": "Felicity",
        "lastName": "Mbamalu",
        "email": "flixco@gmail.com"
      },
      {
        "id": "00006",
        "firstName": "Francis",
        "lastName": "Obialo",
        "email": "frankobialo@gmail.com"
      },
      {
        "id": "0040",
        "firstName": "Gabriel",
        "lastName": "Blessing",
        "email": "gblessed@gmail.com"
      },
      {
        "id": "00005",
        "firstName": "Grace",
        "lastName": "Obialo",
        "email": "geeobialo@gmail.com"
      },
      {
        "id": "00025",
        "firstName": "Harmoney",
        "lastName": "Okekechukwu",
        "email": "primoney@gmail.com"
      },
      {
        "id": "00002",
        "firstName": "James",
        "lastName": "Bello",
        "email": "belloj@gmail.com"
      },
      {
        "id": "00026",
        "firstName": "Mathew",
        "lastName": "Ugochukwu",
        "email": "ugomathew@gmail.com"
      },
      {
        "id": "00022",
        "firstName": "Nnanedum",
        "lastName": "Ojiakor",
        "email": "chrisojiakor@gmail.com"
      },
      {
        "id": "00001",
        "firstName": "Nnayelugo",
        "lastName": "Obialo",
        "email": "alfredcsdinc@gmail.com"
      },
      {
        "id": "00007",
        "firstName": "Oluchi",
        "lastName": "Okafor",
        "email": "ritaokafor@gmail.com"
      },
      {
        "id": "00021",
        "firstName": "Queen",
        "lastName": "Nzubechi",
        "email": "qnzube@gmail.com"
      },
      {
        "id": "00024",
        "firstName": "Queen",
        "lastName": "Nzubechi",
        "email": "queennzube@gmail.com"
      }
    ],
    "success": true,
    "message": "User Data returned",
    "hasErrors": false,
    "errors": [],
    "code": 200
  }

  getUsers(){
    return of(this.allUsers).pipe(delay(4000));
  }

   getUsersAsPromise(criteria : IApiQueryCriteria){
    return this.getUsers().toPromise();
  }

}
