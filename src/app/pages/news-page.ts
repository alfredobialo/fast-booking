import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'fb-news-page',
  template: `
    <div class="news-headline mb-4">
      <h1 class="text-red-700 text-3xl">{{newsTitle}}</h1>
      @if(showContent){
      <div class="flex justify-evenly items-stretch gap-2 flex-col md:flex-row">
            <div class=" p-4 lg:p-14 sm:p-8 drop-shadow-md bg-gradient-to-bl from-gray-100 to-gray-400">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias ipsam ullam vero. Ab aliquam animi consequatur cupiditate dicta, ea inventore sit sunt vel veniam?</div>
            <div class=" p-4 lg:p-14 sm:p-8 drop-shadow-lg border-radius-lg bg-gradient-to-bl from-indigo-500 to-pink-500 text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias aliquid animi aperiam architecto corporis culpa dolore, inventore laborum maio velit vitae, voluptate! Natus, voluptatem.</div>
            <div class=" p-4 lg:p-14 sm:p-8 drop-shadow-md bg-gray-600 text-white">Lorem ipsum dolor sit amet, consectetur adipisicing elit. At atque aut beatae cum eaque eos facere id incidunt, ipsam iste laboriosam maxime nporibus!</div>
        </div>
        <div class="p-2"><button class="btn btn-link" (click)="hideNewsContent()">Hide</button></div>
      }
      @else{
        <div><button class="btn btn-link" (click)="showNewsContent()">Show</button></div>
      }

    </div>
    <div>

    </div>
  `,
  standalone: true,
  styles:[`
    div.news-content {
      display: flex;
      justify-content: space-between;
    }

    div.news-content div {
      text-align: justify;
      padding: 0 1rem;
    }

    div.news-headline h1 {
      /*color: #373535;*/
      font-size: 2rem;
      /*font-family: "Impact", "Arial Black", Verdana, sans-serif;*/
    }
  `]
})

export class NewsPageComponent implements OnInit {
  constructor() {
  }
  @Input({}) showContent = true;
  @Input({}) newsTitle  ="Deliver Result or Face Sack ---Tinubu Threatens Cabinet Members";
  ngOnInit() {
  }

  showNewsContent(){
    this.showContent = true;
  }

  hideNewsContent(){
    this.showContent = false;
  }
}
