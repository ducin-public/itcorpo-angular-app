import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'itcorpo-home',
  template: `
    <section class="flex flex-col items-center justify-center min-h-[240px] p-8 text-center">
      <div class="max-w-xl w-full">
        <img src="assets/commercial-building.png" alt="Office building" class="mx-auto w-40 h-40 sm:w-48 sm:h-48 object-contain rounded-lg shadow-lg mb-6" />

        <h1 class="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-2">Welcome to {{ title }}!</h1>

        <p class="text-slate-600">Your hub for projects, offices, and people — explore the app using the navigation above.</p>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; }
  `]
})
export class HomeComponent implements OnInit {
  title = 'IT Corpo';

  constructor() { }

  ngOnInit() {
  }

}
