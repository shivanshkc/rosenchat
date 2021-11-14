import { Injectable } from '@angular/core';

export interface UserSessionDTO {
  // Identifier.
  email: string;

  // Display info.
  firstName: string;
  lastName: string;
  picture: string;

  // Crypto info.
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserSessionService {
  private readonly userInfoKey = 'user_info';

  public putSessionInfo(info: UserSessionDTO): void {
    localStorage.setItem(this.userInfoKey, JSON.stringify(info));
  }

  public getSessionInfo(): UserSessionDTO | null {
    const info = localStorage.getItem(this.userInfoKey);
    if (!info) {
      return null;
    }

    try {
      return JSON.parse(info);
    } catch (err) {
      return null;
    }
  }

  public removeSessionInfo(): void {
    localStorage.removeItem(this.userInfoKey);
  }

  public isSessionValid(): boolean {
    return false;
  }
}
