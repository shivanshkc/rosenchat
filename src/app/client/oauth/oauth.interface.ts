/**
 * @description Any class that implements this interface can be used as an OAuth provider.
 */
export interface IOAuthService {
  redirect(): Promise<void>;
  code2Token(code: string): Promise<string>;
  token2UserInfo(token: string): Promise<UserInfoDTO>;
}

/**
 * @description This interface represents user's info obtained from an OAuth login.
 */
export interface UserInfoDTO {
  // Identifier.
  email: string;

  // Display info.
  firstName: string;
  lastName: string;
  picture: string;
}
