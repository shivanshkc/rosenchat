import { Component, OnInit } from '@angular/core';

import { OAuthGoogleService } from '../../client/oauth/oauth-google.service';
import { SnackbarService } from '../../services/snackbar.service';
import { tc } from '../../utils';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public branding = 'rosenchat';
  public motto = 'A fresh take on chatting experience.';

  constructor(private oAuthGoogle: OAuthGoogleService, private snack: SnackbarService) {}

  async ngOnInit(): Promise<void> {}

  public async onGoogleLoginClick(): Promise<void> {
    const [err] = await tc(this.oAuthGoogle.redirect());
    if (err) {
      this.snack.error(err);
    }
  }
}
