import 'reflect-metadata';
import { Container } from 'typedi';
import Server from '../server';
import { LoggerService } from '../logger/loggerService';

export default class App {
  public static async start(): Promise<void> {
    const logger = Container.get(LoggerService);
    const server = new Server(logger);

    await server.init();
  }
}
