import { Service } from 'typedi';
import winston, { format, Logger as WinstonLogger, transports } from 'winston';
import { ILogger } from './logger.interface';

@Service()
export class LoggerService implements ILogger {
  private logger: WinstonLogger;

  constructor() {}

  debug(message: string): void {}

  error(message: string, meta?: any): void {
    this.logger = this.log(meta);
    this.logger.error(message);
  }

  info(message: string, meta?: any): void {
    this.logger = this.log(meta);
    this.logger.info(message);
  }

  warn(message: string): void {}

  log(meta?: any): winston.Logger {
    return winston.createLogger({
      exitOnError: false,
      format: format.combine(
        format.timestamp({
          format: 'DD-MM-YYYY HH:mm:ss',
        }),
        format((info) => {
          info.level = info.level.toUpperCase();
          return info;
        })(),
        format.label({ label: meta?.label, message: true }),
        format.colorize({ colors: { info: 'yellow' }, all: true }),
        format.errors({ stack: true }),
        format.json({ space: 3 }),
        format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message} `;
        }),
      ),
      transports: [new transports.Console()],
    });
  }
}
