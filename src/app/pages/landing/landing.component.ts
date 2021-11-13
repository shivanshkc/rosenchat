import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

import { OAuthGoogleService } from '../../client/oauth/oauth-google.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public branding = 'rosenchat';
  public motto = 'A fresh take on chatting experience.';

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private oAuthGoogle: OAuthGoogleService) {}

  async ngOnInit(): Promise<void> {
    const queryParams = await firstValueFrom(this.activatedRoute.queryParams);
    await this.router.navigate([], { queryParams: {} });

    const authCode = queryParams['code'];
    if (!authCode) {
      return;
    }

    const token = await this.oAuthGoogle.code2Token(authCode);
    const userInfo = await this.oAuthGoogle.token2UserInfo(token);

    console.log('UserInfo:', userInfo);
  }

  public async onLoginClick(): Promise<void> {
    await this.oAuthGoogle.redirect();
  }
}
