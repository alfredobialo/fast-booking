import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {CounterStore} from "./counterStore";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  selector: 'counter-component',
  template: `
    <div class="d-flex flex-column justify-content-center align-items-center counter p-5">
      <h4>Counter App</h4>
      <h1 class="text-white fw-bold m-4" [@counter-trigger]="animIncrement ? 'increment' : 'decrement'">
        <span>
          {{ counterValue()}}
        </span></h1>
      <div class="d-flex mb-3 justify-content-center">
        <button class="btn btn-outline-light " (click)="increment()">Increase</button>
        <button class="btn btn-outline-light " (click)="decrement()">Decrease</button>
        <button class="btn btn-outline-light " (click)="resetCounter()">Reset</button>
      </div>
      <div class="">
        <p class="lead muted">Double : {{ doubleCounter() }}</p>
      </div>

    </div>


  `,
  styles: [`
    div.counter {
      min-height: 250px;
      min-width: 270px;
      border-radius: 8px;
      border: 6px solid #462c95;
      background-color: #af97f8;

    }

    div.counter button.btn {
      margin-right: 3px;

    }

  `],
  animations: [
    trigger("counter-trigger", [
      state("increment", style({
        transform: "scale(1.7)",
        color: 'white'

      })),
      state("decrement", style({
        transform: "scale(1)",
        color: 'red'
      })),
      transition("increment <=> decrement", [
        animate("450ms ease-in")
      ])
    ])
  ]
})

export class CounterComponent  {
  store = inject(CounterStore);
  counterValue = this.store.counter;
  doubleCounter = this.store.doubleCounter;
  animIncrement = false;
  constructor() {
  }
  increment(){
    this.store.increment();
    this.animIncrement  = true;
    console.log("Counter Increment :" ,this.counterValue(), "Double Counter: ", this.doubleCounter());
  }

  decrement(){
    this.store.decrement();
    this.animIncrement  =false;
    console.log("Counter Decrement:" ,this.counterValue(), "Double Counter: ", this.doubleCounter());
  }

  resetCounter(){
    this.store.reset();
  }
}
