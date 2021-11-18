import { ThemePalette } from '@angular/material/core';

import { OAuthProvider } from '../enums';

/**
 * @description SessionInfoDTO is the schema for a user's session info.
 */
export interface SessionInfoDTO {
  email: string;
  provider: OAuthProvider;
  idToken: string;
}

/**
 * @description ProfileInfoDTO is the schema for a user's profile info.
 */
export interface ProfileInfoDTO {
  id: string;
  email: string;

  firstName: string;
  lastName: string;
  pictureLink: string;
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

/**
 * @description SnackBarDataDTO is the schema of the data required to
 * launch a snackBar.
 */
export interface SnackBarDataDTO {
  message: string;
  color: ThemePalette;
  icon: string;
}
