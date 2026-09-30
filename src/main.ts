import { provideZoneChangeDetection } from "@angular/core";
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

// import { provideExperimentalZonelessChangeDetection } from "@angular/core";
// provideExperimentalZonelessChangeDetection();

platformBrowserDynamic().bootstrapModule(AppModule, { applicationProviders: [provideZoneChangeDetection()], })
  .catch(err => console.error(err));


// var a = signal(1)
// var sq = computed(() => a() * a())
