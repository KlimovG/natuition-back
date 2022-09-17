import { Service } from 'typedi';
import winston, { format, Logger as WinstonLogger } from 'winston';
import { ILogger } from './logger.interface';

@Service()
export class Logger implements ILogger {
  private logger: WinstonLogger;

  constructor() {}

  debug(message: string): void {}

  error(message: string): void {}

  info(message: string, meta?: any): void {
    this.logger = this.log(meta);
    this.logger.info(message);
  }

  warn(message: string): void {}

  log(meta?: any): winston.Logger {
    return winston.createLogger({
      format: format.combine(
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss',
        }),
        format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        format.colorize({ colors: { info: 'yellow' }, all: true }),
        format.errors({ stack: true }),
        format.json({ space: 3 }),
        format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] [${meta}] ${level}: ${message} `;
        }),
      ),
    });
  }
}
