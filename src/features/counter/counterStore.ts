import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {computed} from "@angular/core";

const initialState = {counter : 0};

export const CounterStore = signalStore(
  {providedIn : 'root'},
  withState(initialState),
  withComputed(state => ({
    doubleCounter : computed( () => {
      if(state.counter() > 0)
        return state.counter() * 2;

      return 0;
    })
  })),
  withMethods(state => {
    return {
      increment(){
        patchState(state, s => {
          return {counter  : s.counter + 1};
        })
      },
      decrement(){
        patchState(state, s => {
          return {counter  : s.counter - 1};
        })
      }
    }
  })
);
