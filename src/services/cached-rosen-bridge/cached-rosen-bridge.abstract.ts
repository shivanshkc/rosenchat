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

  /**
   * @description getChatList provides the IDs of all users that the currently
   * logged in user is chatting with.
   */
  public abstract getChatList(): string[];

  /**
   * @description getChatMessages provides all chat messages in order for the
   * provided user ID.
   *
   * @param userID User ID is the ID of the user for whom the chat messages
   *  will be fetched.
   */
  public abstract getChatMessages(userID: string): RosenBridgeMessageDTO[];

  /**
   * @description addChat adds a new user ID to the logged in user's chatting list.
   *
   * @param userID - User ID is the user to be added in the chat list.
   */
  public abstract addChat(userID: string): void;

  /* Methods below are for standard RosenBridge operations. */

  public abstract connect(address: string, userID: string): Promise<void>;
  public abstract disconnect(): Promise<void>;
  public abstract listen(handler: (message: RosenBridgeMessageDTO) => Promise<void>): void;
  public abstract send(message: RosenBridgeMessageDTO): Promise<void>;
}
