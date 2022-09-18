import App from './core/app';
import { LoggerService } from './core/logger/loggerService';
import { Container } from 'typedi';

const logger = Container.get(LoggerService);
App.start().catch((error) => logger.error(error));
