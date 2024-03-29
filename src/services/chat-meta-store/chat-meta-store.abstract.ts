/**
 * @description AbstractChatMetaStoreService represents an abstract service
 * that persists Chat related metadata.
 */
export abstract class AbstractChatMetaStoreService {
  /**
   * @description getCurrentActiveChat provides the ID of the user whose chat
   * is currently active.
   */
  public abstract getCurrentActiveChat(): string;

  /**
   * @description setCurrentActiveChat sets the value of currently active chat.
   *
   * @param id - The ID of the user whose chat is to be set as active.
   */
  public abstract setCurrentActiveChat(id: string): void;

  /**
   * @description getUnreadCount provides the number of unread messages for
   * the user with the provided ID.
   *
   * @param id - The ID of the user for whom the count should be fetched.
   */
  public abstract getUnreadCount(id: string): Promise<number>;

  /**
   * @description setUnreadCount sets the unread message count of
   * the user with the provided ID to the provided amount.
   *
   * @param id - The ID of the user whose count is to be incremented.
   * @param amount - The amount to be set.
   */
  public abstract setUnreadCount(id: string, amount: number): Promise<void>;
}
