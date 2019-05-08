import { plainToClass } from 'class-transformer';
import { IncomingMessage, ServerResponse } from 'http';
import { verify } from 'jsonwebtoken';
import { User } from '../entities/User.entity';
import { Context } from './context.type';

export const context = (arg: any): Context => {
  const { req, res } = arg;
  const request = req as IncomingMessage;
  const response = res as ServerResponse;
  if (request.headers.authorization && request.headers.authorization.includes('Bearer ')) {
    const JWT = request.headers.authorization.split('Bearer ')[1];
    try {
      const user = plainToClass(User, verify(JWT, 'thuper_thecret'));
      return {
        user
      };
    }
    catch (e) {
      response;
      throw e;
    }
  }
  return {
    user: null
  };
};
