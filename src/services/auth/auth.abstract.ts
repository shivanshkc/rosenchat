import { OAuthProvider } from '../../core/enums';
import { SessionInfoDTO } from '../../core/models';

/**
 * @description AbstractAuthService represents an abstract Authentication Service.
 */
export abstract class AbstractAuthService {
  /**
   * @description startLogin initiates the OAuth login process
   * by redirecting the user to the provider's authentication page.
   *
   * @param provider Provider is the name of the OAuth Provider.
   */
  public abstract startLogin(provider: OAuthProvider): Promise<void>;

  /**
   * @description finishLogin completes the login process by
   * verifying and persisting the ID token.
   *
   * @param provider Provider is the name of the OAuth Provider.
   * @param idToken ID token is the JWT that the provider issues
   * after successful login.
   */
  public abstract finishLogin(provider: OAuthProvider, idToken: string): Promise<void>;

  /**
   * @description isLoggedIn returns true if there is a valid session.
   */
  public abstract isLoggedIn(): Promise<boolean>;

  /**
   * @description logout destroys the current session and takes the
   * user back to the login screen.
   */
  public abstract logout(): Promise<void>;

  /**
   * @description getSessionInfo provides the info on the current session.
   */
  public abstract getSessionInfo(): SessionInfoDTO;
}
