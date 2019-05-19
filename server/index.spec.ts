import { buildAppSchema } from './buildAppSchema';
import express = require('express');

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
    expect(server).toHaveProperty('_router');
    expect(server).toHaveProperty('listen');

    done();
  });
});
