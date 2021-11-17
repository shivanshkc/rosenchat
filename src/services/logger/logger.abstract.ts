/**
 * @description AbstractLoggerService represents an abstract Logger Service.
 */
import { LoggingOptionsDTO } from '../../core/models';

export abstract class AbstractLoggerService {
  /**
   * @description Logs at debug level.
   *
   * @param options Options can be used to configure the logging behaviour.
   * @param message Message is original message to be logged.
   * @param optionalParams Optional params are other arguments that also will be logged.
   */
  public abstract debug(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void;

  /**
   * @description Logs at info level with styled according to 'success'.
   *
   * @param options Options can be used to configure the logging behaviour.
   * @param message Message is original message to be logged.
   * @param optionalParams Optional params are other arguments that also will be logged.
   */
  public abstract success(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void;

  /**
   * @description Logs at info level.
   *
   * @param options Options can be used to configure the logging behaviour.
   * @param message Message is original message to be logged.
   * @param optionalParams Optional params are other arguments that also will be logged.
   */
  public abstract info(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void;

  /**
   * @description Logs at debug level.
   *
   * @param options Options can be used to configure the logging behaviour.
   * @param message Message is original message to be logged.
   * @param optionalParams Optional params are other arguments that also will be logged.
   */
  public abstract warn(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void;

  /**
   * @description Logs at debug level.
   *
   * @param options Options can be used to configure the logging behaviour.
   * @param message Message is original message to be logged.
   * @param optionalParams Optional params are other arguments that also will be logged.
   */
  public abstract error(options: LoggingOptionsDTO, message?: unknown, ...optionalParams: unknown[]): void;
}
