import { Component, OnInit } from '@angular/core';

import { OAuthGoogleService } from '../../client/oauth/oauth-google.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public branding = 'rosenchat';
  public motto = 'A fresh take on chatting experience.';

  constructor(private oAuthGoogle: OAuthGoogleService) {}

  async ngOnInit(): Promise<void> {}

  public async onGoogleLoginClick(): Promise<void> {
    await this.oAuthGoogle.redirect();
  }
}
