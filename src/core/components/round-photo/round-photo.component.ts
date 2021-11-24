import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-round-photo',
  templateUrl: './round-photo.component.html',
  styleUrls: ['./round-photo.component.scss'],
})
export class RoundPhotoComponent {
  @Input() src = '';
  @Input() alt = '';
}
