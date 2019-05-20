process.env.APP_ROOT_PATH = __dirname;

import 'reflect-metadata';
import { useContainer as gqlUseContainer } from 'type-graphql';
import Container from 'typedi';
import { useContainer as ormUseContainer } from 'typeorm';
import { buildAppSchema } from './buildAppSchema';
import { dbConnect } from './db-connect';
import './logger';

(async () => {
  ormUseContainer(Container);
  gqlUseContainer(Container);
  const [
    server
  ] = await Promise.all([
    buildAppSchema(),
    dbConnect()
  ]);

  const result = await server.listen(8080);
  console.log(`Listening: ${result.address()}`);
})();

