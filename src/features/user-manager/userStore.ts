import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {UserManagerService} from "./user-manager-service";
import {computed, inject} from "@angular/core";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {exhaustMap, pipe, tap} from "rxjs";
import {tapResponse} from "@ngrx/component-store";
import {IApiQueryCriteria, PagedApiResponseData, UserDataModel} from "../model/ApiResponseModel";

export interface IUserStoreModel {
  userDataResponse: PagedApiResponseData<UserDataModel[]>,
  requestCriteria: IApiQueryCriteria,
  processing: boolean,
  selectedUserId: string | null
}

const defApiResponse: PagedApiResponseData<UserDataModel[]> = {
  data: [],
  message: "Not Connected to server",
  pageSize: 10,
  success: true,
  currentPage: 1,
  totalRecord: 0
}

const userState: IUserStoreModel = {
  userDataResponse: defApiResponse,
  selectedUserId: null,
  processing: false,
  requestCriteria: {pageSize: 10, currentPage: 1,sortBy :"name asc"}
};
export const UserStore = signalStore(
  {providedIn: "root"},
  withState<IUserStoreModel>(userState),
  withComputed(store => {
    return {
      users: computed(() => {
        return store.userDataResponse().data;
      })
    }
  }),
  withMethods(store => {
    const userService = inject(UserManagerService);

    return {
      getUsers: rxMethod<IApiQueryCriteria>(
        pipe(
          tap( (x) => patchState(store, {processing: true})),
          exhaustMap((x) => {
            return userService.getUsers(x).pipe(
              tapResponse({
                next: d => {
                  console.log("RxMethod Response => " ,d.data);
                  patchState(store, {userDataResponse: d});

                }, error: (err) => {
                  console.log(err)
                },
                finalize : () => { patchState(store, { processing : false})}

              })
            )

          })
        )
      ),
      setCriteria(criteria : IApiQueryCriteria){
        patchState(store, {requestCriteria : criteria})
      }
    }
  }),
  withHooks({
    onInit(store) {
      console.log("User Store Hooks OnInit Called");
      store.getUsers(store.requestCriteria);
    }
  }))
;
