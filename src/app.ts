import 'reflect-metadata';
import express from 'express';
import initializeDB from './database';
import { buildSchema } from 'type-graphql';
import { CustomerResolver } from './resolvers/customer';
import { Container } from 'typedi';
import { ApolloServer } from 'apollo-server-express';

const app = express();

const startApp = async () => {
  await initializeDB();
  const schema = await buildSchema({
    resolvers: [CustomerResolver],
    container: Container,
    emitSchemaFile: true,
  });

  const server = new ApolloServer({
    schema,
  });

  await server.start();
  server.applyMiddleware({ app });

  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/graphql`);
  });
};

startApp();
