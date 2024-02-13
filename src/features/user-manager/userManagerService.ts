import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {ApiResponse, ApiResponseData, PagedApiResponseData, UserDataModel} from "../model/ApiResponseModel";

@Injectable()
export class UserManagerService {

    baseUrl = environment.apiBaseUrls.userManager;
    private initValue : PagedApiResponseData<UserDataModel[]> =  {
        pageSize : 5,
        totalRecord :10,
        success : false,
        message : "No Data",
        data : []
    };
    constructor(private httpClient: HttpClient) {
    }

    // get User By Id
    getUserById(userId: string): Observable<ApiResponseData<UserDataModel>> {
        return this.httpClient.get<ApiResponseData<UserDataModel>>(`${this.baseUrl}/${userId}`);
    }

    createNewUser(userData :  UserDataModel){
        console.log("Create User with Data", userData);
        const headers = {"Content-Type" : "application/json", "Accept": "application/json"};
        return this.httpClient.post<ApiResponse>(`${this.baseUrl}`, userData, {
            headers
        });
    }

    getUsers(criteria : any) {

        const queryParams  = new HttpParams({fromObject : criteria} ) ;

        const listHeaders = new Headers();
        listHeaders.append("X-App-Name","AngularUser Client");
        listHeaders.append("Content-Type","application/json");
        listHeaders.append("Accept","application/json");
        listHeaders.append("Authorization","Bearer token-value-goes-here");

        const header =  new HttpHeaders( listHeaders);

        return this.httpClient.get<PagedApiResponseData<UserDataModel[]>>(`${this.baseUrl}`, {headers : header, params : queryParams});
    }

}
