import {patchState, signalStore, withComputed, withHooks, withMethods, withState} from "@ngrx/signals";
import {UserManagerService} from "./user-manager-service";
import {computed, inject} from "@angular/core";
import {rxMethod} from "@ngrx/signals/rxjs-interop";
import {map, pipe, switchMap, tap} from "rxjs";
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
  requestCriteria: {pageSize: 10, currentPage: 1}
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
    patchState(store, {processing: true});
    return {
      getUsersRx: rxMethod<PagedApiResponseData<UserDataModel[]>>(
        pipe(
          switchMap((x) => {
            return userService.getUsers().pipe(
              tapResponse({
                next: d => {
                  console.log(d.data);
                  patchState(store, {
                    processing: false, userDataResponse: d
                  });

                }, error: (err) => {
                  console.log(err)
                }

              })
            )

          })
        )
      ),
      async getUsers() {
        patchState(store, {processing: true})
        const d = await userService.getUsersAsPromise(store.requestCriteria());
        console.log(d?.data);
        patchState(store, {
          processing: false, userDataResponse: d
        });
      }
    }
  }),
  withHooks({
    onInit(store) {
      store.getUsers();
    }
  }))
;
