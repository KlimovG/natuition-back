import { format, LoggerOptions } from 'winston';

export const logger: LoggerOptions = {
  exitOnError: false,
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.align(),
    format.timestamp({
      format: 'YY-MM-DD HH:mm:ss',
    }),
    format.errors({ stack: true }),
    format.splat(),
    format.json({ space: 3 }),
  ),
};
