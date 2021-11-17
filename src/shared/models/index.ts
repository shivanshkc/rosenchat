import { OAuthProvider } from '../enums';

/**
 * @description SessionInfoDTO is the schema for a user's session info.
 */
export interface SessionInfoDTO {
  // Identifier info.
  email: string;

  // Display info.
  firstName: string;
  lastName: string;
  pictureLink: string;

  // Auth info.
  provider: OAuthProvider;
  idToken: string;
}
