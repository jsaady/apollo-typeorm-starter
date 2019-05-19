import * as apollo from 'apollo-server-express';
import express, * as Express from 'express';
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { join } from 'path';
import { buildSchema } from 'type-graphql';
import { authChecker } from './middlewares/auth-checker';
import { context } from './middlewares/auth-context';
import { resolvers } from './resolvers';

const history: (file: string, conf: { root: string }) => Express.Handler = require('express-history-api-fallback');

export async function buildAppSchema() {
  const schema = await buildSchema({
    resolvers,
    authChecker
  });

  writeFileSync(join(__dirname, '..', 'schema.gql'), printSchema(schema, {
    commentDescriptions: true
  }));

  const server = new apollo.ApolloServer({
    schema,
    playground: true,
    context
  });

  const app = express();
  const root = join(__dirname, '..', 'assets')
  app.use('/', express.static(root));
  app.use(history('index.html', { root: root }));
  server.applyMiddleware({
    cors: {
      origin: '*'
    },
    app,
    path: '/graphql'
  });

  return app;
}
