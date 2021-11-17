import { ThemePalette } from '@angular/material/core';

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

/**
 * @description LoggingOptionsDTO is the schema for logging options.
 */
export interface LoggingOptionsDTO {
  /**
   * @description If true, shows a snackbar.
   */
  snack: boolean;
}

export interface SnackBarDataDTO {
  message: string;
  color: ThemePalette;
  icon: string;
}
