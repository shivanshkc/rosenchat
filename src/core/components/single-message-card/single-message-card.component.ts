import { Component, Input } from '@angular/core';

import { TimeFormatterService } from '../../../services/time-formatter/time-formatter.service';
import { RBInOutMessage } from '../../models';

@Component({
  selector: 'app-single-message-card',
  templateUrl: './single-message-card.component.html',
  styleUrls: ['./single-message-card.component.scss'],
})
export class SingleMessageCardComponent {
  @Input() message: RBInOutMessage | undefined;

  constructor(private readonly _timeFormatter: TimeFormatterService) {}

  public formatTime(): string {
    const time = new Date(this.message?.sentAtMS || Date.now());
    return this._timeFormatter.twelveHourPretty(time);
  }
}
