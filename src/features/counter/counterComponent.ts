import {Component, inject} from '@angular/core';
import {CounterStore} from "./counterStore";

@Component({
  standalone:true,
  selector: 'counter-component',
  template: `
    <div class="d-flex flex-column justify-content-center align-items-center counter p-5" >
      <h4>Counter App</h4>
      <h1 class="text-white fw-bold m-4">{{counterValue()}}</h1>
      <div class="d-flex mb-3 justify-content-center">
        <button class="btn btn-outline-light " (click)="increment()">Increase</button>
        <button class="btn btn-outline-light " (click)="decrement()">Decrease</button>
        <button class="btn btn-outline-light " (click)="resetCounter()">Reset</button>
      </div>
      <div class="">
        <p class="lead muted">Double : {{doubleCounter()}}</p>
      </div>

    </div>


  `,
  styles:[`
    div.counter {
      min-height: 250px;
      min-width:270px;
      border-radius: 8px;
      border: 6px solid #462c95;
      background-color: #af97f8;

    }
    div.counter button.btn{
      margin-right: 3px;

    }

  `]
})

export class CounterComponent  {
  store = inject(CounterStore);
  counterValue = this.store.counter;
  doubleCounter = this.store.doubleCounter;

  constructor() {
  }
  increment(){
    this.store.increment();
    console.log("Counter Increment :" ,this.counterValue(), "Double Counter: ", this.doubleCounter());
  }

  decrement(){
    this.store.decrement();
    console.log("Counter Decrement:" ,this.counterValue(), "Double Counter: ", this.doubleCounter());
  }

  resetCounter(){
    this.store.reset();
  }
}
