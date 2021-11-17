import { Component } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent {
  public branding = 'rosenchat';
  public motto = 'A fresh take on chatting experience.';

  public async onGoogleLoginClick(): Promise<void> {}
}
