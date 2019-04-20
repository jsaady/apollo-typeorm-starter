process.env.APP_ROOT_PATH = __dirname;

import * as apollo from 'apollo-server';
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { join } from 'path';
import 'reflect-metadata';
import { buildSchema, useContainer as gqlUseContainer } from 'type-graphql';
import Container from 'typedi';
import { createConnection, useContainer as ormUseContainer } from 'typeorm';
import './logger';
import { context } from './middlewares/auth-context';
import { AuthResolver } from './resolvers/auth.resolver';

(async () => {
  ormUseContainer(Container);
  gqlUseContainer(Container);
  const [
    schema
  ] = await Promise.all([
    buildSchema({
      resolvers: [AuthResolver]
    }),
    createConnection()
  ]);
  writeFileSync(join(__dirname, '..', 'schema.gql'), printSchema(schema, {
    commentDescriptions: true
  }));
  const server = new apollo.ApolloServer({
    schema,
    playground: true,
    cors: {
      origin: '*'
    },
    context
  });
  
  const result = await server.listen(4000);
  console.log(`Listening: ${result.url}`);
})();