import { ThemePalette } from '@angular/material/core';

import { OAuthProvider } from '../enums';

/**
 * @description SessionInfoDTO is the schema for a user's session info.
 */
export interface SessionInfoDTO {
  id: string;
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
 * @description RosenBridgeMessageDTO is the schema of a message sent
 * through RosenBridge.
 */
export interface RosenBridgeMessageDTO {
  senderID: string;
  receiverIDs: string[];
  content: string;
  sentAtMS: number;
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

/**
 * @description AddUserDialogDataDTO is the data required by the AddUserDialog.
 */
export interface AddUserDialogDataDTO {
  profile: ProfileInfoDTO;
  callback: (reply: boolean) => void;
}

/**
 * @description ConfirmDialogDataDTO is the data required by the ConfirmDialog.
 */
export interface ConfirmDialogDataDTO {
  message?: string;

  okButtonText?: string;
  okButtonColor?: ThemePalette;

  cancelButtonText?: string;
  cancelButtonColor?: ThemePalette;

  callback?: (ok: boolean) => void;
}

/**
 * @description BackendUserInfoDTO is the schema of the user info received from the backend.
 */
export interface BackendUserInfoDTO {
  _id: string;
  email: string;
  first_name: string;
  last_name: string;
  picture_link: string;
}

/**
 * @description BackendErrorDTO is the schema of an error from the backend.
 */
export interface BackendErrorDTO {
  error: {
    status_code: number;
    custom_code: string;
    errors: string[];
  };
}
