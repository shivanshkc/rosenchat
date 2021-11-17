import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { tc } from './core/utils';
import { environment } from './environments/environment';
import { RootModule } from './modules/root/root.module';

(async (): Promise<void> => {
  const isProduction = environment.production;
  if (isProduction) {
    enableProdMode();
  }

  const pbDynamic = platformBrowserDynamic();
  const [err] = await tc(pbDynamic.bootstrapModule(RootModule));
  if (err) {
    console.error(err);
  }
})();
