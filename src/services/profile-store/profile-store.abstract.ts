import { ProfileInfoDTO } from '../../core/models';

/**
 * @description AbstractProfileStoreService represents an abstract Profile Store Service.
 */
export abstract class AbstractProfileStoreService {
  /**
   * @description getProfileInfo retrieves the previously persisted profile info.
   *
   * @param id - id is the identifier of the profile.
   */
  public abstract getProfileInfo(id: string): void;

  /**
   * @description setProfileInfo persists the provided profile info for later retrieval.
   *
   * @param info - info is the data to be persisted.
   */
  public abstract setProfileInfo(info: ProfileInfoDTO): void;
}
