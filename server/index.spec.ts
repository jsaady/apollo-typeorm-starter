import { ApolloServer } from 'apollo-server';
import { buildAppSchema } from './buildAppSchema';

describe('server', () => {
  it('should be able to compile', async (done) => {
    let compErr = null;
    let server;
    try {
      server = await buildAppSchema();
    } catch (err) {
      compErr = err;
    }

    expect(compErr).toBeNull();
    expect(server).toBeInstanceOf(ApolloServer);
  });
});
