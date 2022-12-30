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
 * @description RBMessageDTO is the schema of any message sent through rosenbridge.
 */
export interface RBMessageDTO<T> {
  type: string;
  request_id: string;
  body: T;
}

/**
 * @description RBIncomingMessageDTO is the schema of an incoming rosenbridge message.
 */
export interface RBIncomingMessageDTO {
  sender_id: string;
  message: string;

  sentAtMS: number;
}

/**
 * @description RBOutgoingMessageDTO is the schema of an outgoing rosenbridge message.
 */
export interface RBOutgoingMessageDTO {
  sender_id: string;
  receiver_ids: string[];
  message: string;

  sentAtMS: number;
}

/**
 * @description RBInOutMessage supports both incoming and outgoing rosenbridge message types.
 */
export type RBInOutMessage = RBOutgoingMessageDTO | RBIncomingMessageDTO;

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
    code: string;
    reason: string;
  };
}
