import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { RootModule } from './modules/root/root.module';
import { tc } from './shared/utils';

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
