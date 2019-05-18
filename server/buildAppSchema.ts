import * as apollo from 'apollo-server';
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { join } from 'path';
import { buildSchema } from 'type-graphql';
import { authChecker } from './middlewares/auth-checker';
import { context } from './middlewares/auth-context';
import { resolvers } from './resolvers';

export async function buildAppSchema() {
  const schema = await buildSchema({
    resolvers,
    authChecker
  });

  writeFileSync(join(__dirname, '..', 'schema.gql'), printSchema(schema, {
    commentDescriptions: true
  }));

  return new apollo.ApolloServer({
    schema,
    playground: true,
    cors: {
      origin: '*'
    },
    context
  })
}
