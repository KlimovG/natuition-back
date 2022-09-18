import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { GraphQLSchema } from 'graphql';
import { CustomerResolver } from '../../resolvers/customer';
import { Container } from 'typedi';
import * as core from 'express-serve-static-core';
import { LoggerService } from '../logger/loggerService';
import DataBase from '../database';

export default class Server {
  public apolloServer: ApolloServer;
  public app: core.Express;
  private db: DataBase;
  readonly port = process.env.PORT || 3000;

  constructor(private logger: LoggerService) {
    this.app = express();
    this.db = new DataBase(this.logger);
  }

  public async init(): Promise<Server> {
    await this.db.init();
    this.apolloServer = await this.gqlServer();

    await this.apolloServer.start();
    this.apolloServer.applyMiddleware({ app: this.app });

    this.app.listen(this.port, () => {
      this.logger.info(
        `Server is running on http://localhost:${this.port}/graphql`,
        { label: 'Server' },
      );
    });

    this.app.on('error', (error) =>
      this.logger.error(`On app error: ${error}`, { label: 'Error' }),
    );
    return this;
  }

  public async gqlServer(): Promise<ApolloServer> {
    const schema = await this.getGQLSchema();
    return new ApolloServer({ schema });
  }

  public async getGQLSchema(): Promise<GraphQLSchema> {
    return await buildSchema({
      resolvers: [CustomerResolver],
      container: Container,
      emitSchemaFile: true,
    });
  }
}
