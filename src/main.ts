import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';


import { SharedModule } from './app/shared/shared.module';

platformBrowserDynamic().bootstrapModule(SharedModule)
  .catch(err => console.error(err));
