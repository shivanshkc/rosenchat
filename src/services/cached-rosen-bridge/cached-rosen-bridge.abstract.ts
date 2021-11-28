import { RosenBridgeMessageDTO } from '../../core/models';
import { AbstractRosenBridgeService } from '../rosen-bridge/rosen-bridge.abstract';

/**
 * @description AbstractCachedRosenBridgeService represents an abstract
 * RosenBridge client that also persists the sent and received messages locally.
 */
export abstract class AbstractCachedRosenBridgeService implements AbstractRosenBridgeService {
  /**
   * @description getLastMessage provides the last message in the chat with the
   * provided userID.
   *
   * @param userID - User ID is the ID of the user for whom the last message
   * will be fetched.
   */
  public abstract getLastMessage(userID: string): Promise<RosenBridgeMessageDTO | undefined>;

  /**
   * @description getChatList provides the IDs of all users that the currently
   * logged in user is chatting with.
   */
  public abstract getChatList(): Promise<string[]>;

  /**
   * @description getChatMessages provides all chat messages in order for the
   * provided user ID.
   *
   * @param userID User ID is the ID of the user for whom the chat messages
   *  will be fetched.
   */
  public abstract getChatMessages(userID: string): Promise<RosenBridgeMessageDTO[]>;

  /**
   * @description addChat adds a new user ID to the logged in user's chatting list.
   *
   * @param userID - User ID is the user to be added in the chat list.
   */
  public abstract addChat(userID: string): Promise<void>;

  /* Methods below are for standard RosenBridge operations. */

  public abstract connect(address: string, userID: string): Promise<void>;
  public abstract disconnect(): Promise<void>;
  public abstract listen(handler: (message: RosenBridgeMessageDTO) => void): void;
  public abstract send(message: RosenBridgeMessageDTO): Promise<void>;
}
