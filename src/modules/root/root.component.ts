import { Component } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { AbstractLoggerService } from '../../services/logger/logger.abstract';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.scss'],
})
export class RootComponent {
  title = 'rosenchat';

  constructor(private readonly _swUpdate: SwUpdate, private readonly _log: AbstractLoggerService) {
    this._swUpdate.available.subscribe((event) => {
      this._log.info({ snack: true }, event);
    });
  }
}
