import { LoggerOptions, transports } from 'winston';

export const loggerOptions: LoggerOptions = {
  transports: [new transports.Console()],
  exitOnError: false,
};
