import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppModule } from './module-app/app.module';
import { tc } from './utils';

(async (): Promise<void> => {
  const isProduction = environment.production;
  if (isProduction) {
    enableProdMode();
  }

  const pbDynamic = platformBrowserDynamic();
  const [err] = await tc(pbDynamic.bootstrapModule(AppModule));
  if (err) {
    console.error(err);
  }
})();
