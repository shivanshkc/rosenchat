import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
})
export class LandingComponent implements OnInit {
  public branding = 'rosenchat';
  public motto = 'A fresh take on chatting experience.';

  constructor() {}

  ngOnInit(): void {}
}
