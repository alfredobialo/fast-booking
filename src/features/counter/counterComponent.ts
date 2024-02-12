import {Component, computed, signal} from '@angular/core';

@Component({
  standalone:true,
  selector: 'counter-component',
  template: `
    <div class="d-flex flex-column justify-content-center align-items-center counter p-5" >
      <h4>Counter with Signal</h4>
      <h1 class="text-white fw-bold m-4">{{counterValue()}}</h1>
      <div class="d-flex mb-3 justify-content-center">
        <button class="btn btn-outline-light btn-lg" (click)="increment()">Increase</button>
        <button class="btn btn-outline-light btn-lg" (click)="decrement()">Decrease</button>
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
  counterValue = signal<number>(0);
  doubleCounter = computed(() => {
    if(this.counterValue() > 0 )
        return this.counterValue() * 2;
    return 0;
  });

  constructor() {
  }
  increment(){
    this.counterValue.update(x => x +1);
    console.log("Counter Increment :" ,this.counterValue(), "Double Counter: ", this.doubleCounter());
  }

  decrement(){
    this.counterValue.update(x => x - 1);
    console.log("Counter Decrement:" ,this.counterValue(), "Double Counter: ", this.doubleCounter());
  }
}
