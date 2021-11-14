import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  constructor(private router: Router) {}

  async ngOnInit(): Promise<void> {
    if (window.screen.width > 768) {
      await this.router.navigate(['/home']);
    }
  }
}
