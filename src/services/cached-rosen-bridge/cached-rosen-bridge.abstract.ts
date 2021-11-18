import { RosenBridgeMessageDTO } from '../../core/models';
import { AbstractRosenBridgeService } from '../rosen-bridge/rosen-bridge.abstract';

/**
 * @description AbstractCachedRosenBridgeService represents an abstract
 * RosenBridge client that also persists the sent and received messages locally.
 */
export abstract class AbstractCachedRosenBridgeService implements AbstractRosenBridgeService {
  /**
   * @description clearCache clears any persisted cache.
   */
  public abstract clearCache(): void;

  /**
   * @description getLastMessage provides the last message in the chat with the
   * provided userID.
   *
   * @param userID - User ID is the ID of the user for whom the last message
   * will be fetched.
   */
  public abstract getLastMessage(userID: string): RosenBridgeMessageDTO;

  /* Methods below are for standard RosenBridge operations. */

  public abstract connect(address: string, userID: string): Promise<void>;
  public abstract disconnect(): Promise<void>;
  public abstract listen(handler: (message: RosenBridgeMessageDTO) => Promise<void>): Promise<void>;
  public abstract send(message: RosenBridgeMessageDTO): Promise<void>;
}
