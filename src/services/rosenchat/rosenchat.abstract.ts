/**
 * @description AbstractRosenchatService represents an abstract
 * Rosenchat backend client.
 */
import { ProfileInfoDTO } from '../../core/models';

export abstract class AbstractRosenchatService {
  /**
   * @description getProfileInfo provides the profile info for the user with
   * the specified user ID.
   *
   * @param email - Email is the identifier of the user whose profile info
   * will be fetched.
   */
  public abstract getProfileInfo(email: string): Promise<ProfileInfoDTO>;
}
