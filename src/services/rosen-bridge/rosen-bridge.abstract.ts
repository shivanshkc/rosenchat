import { RBIncomingMessageDTO, RBOutgoingMessageDTO } from '../../core/models';

/**
 * @description AbstractRosenBridgeService represents an abstract
 * RosenBridge client.
 */
export abstract class AbstractRosenBridgeService {
  /**
   * @description connect establishes connection with RosenBridge.
   *
   * @param address - Address is RosenBridge's deployment address.
   * @param userID - User ID is the identifier of the user for whom the
   * connection will be established.
   */
  public abstract connect(address: string, userID: string): Promise<void>;

  /**
   * @description disconnect destroys the connection with RosenBridge.
   */
  public abstract disconnect(): Promise<void>;

  /**
   * @description listen is a 'subscribe' call to the RosenBridge connection.
   *
   * @param handler - Handler is a function that can handle an incoming
   * RosenBridge message.
   */
  public abstract listen(handler: (message: RBIncomingMessageDTO) => void): void;

  /**
   * @description send sends a message to RosenBridge.
   *
   * @param message - Message is the data that will be sent to RosenBridge.
   */
  public abstract send(message: RBOutgoingMessageDTO): Promise<void>;
}
