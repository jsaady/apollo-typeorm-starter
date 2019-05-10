import { plainToClass } from "class-transformer";
import gql from "graphql-tag";
import { LoginArgument } from "../../common/arguments/login.argument";
import { LogoutArgument } from '../../common/arguments/logout.argument';
import { RefreshArgument } from "../../common/arguments/refresh.argument";
import { TokenObject } from "../../common/objects/Token.object";
import { client } from "./GraphQL";

class TokenManager {
  constructor (
    private readonly tokenKey = '_currentJWT',
    private readonly clientKey = '_currentClient'
  ) { }

  refreshPromise: Promise<void>;

  private login$ = gql`
    mutation DoLogin($username: String!, $password: String!, $clientIdentifier: String!) {
      login(username: $username, password: $password, clientIdentifier: $clientIdentifier) {
        refreshToken
        refreshTokenExpiration
        authToken
        authTokenExpiration
        user {
          username
          permissions
        }
      }
    }
  `;

  private refresh$ = gql`
    mutation DoRefresh($refreshToken: String!, $clientIdentifier: String!) {
      refresh(refreshToken: $refreshToken, clientIdentifier: $clientIdentifier) {
        refreshToken
        refreshTokenExpiration
        authToken
        authTokenExpiration
        user {
          username
          permissions
        }
      }
    }
  `;

  private logout$ = gql`
    mutation DoLogout($clientIdentifier: String!) {
      logout(clientIdentifier: $clientIdentifier)
    }
  `;

  private something$ = gql`
    query DoSomething {
      something
    }
  `;

  private getClientIdentifier () {
    const id = localStorage.getItem(this.clientKey) || ('' + Date.now() * (1 + Math.random()));
    localStorage.setItem(this.clientKey, id);

    return id;
  }

  private setTokenObject (token: TokenObject) {
    localStorage.setItem(this.tokenKey, JSON.stringify(token));
  }

  async getLatestToken () {
    if (!this.hasCurrentValidToken() && this.hasFutureValidToken()) {
      this.refreshPromise = this.refreshPromise || this.refresh();
      await this.refreshPromise;
      this.refreshPromise = null;
    }
    if (!this.hasCurrentValidToken()) { // double check that the refresh went through
      throw new Error('Token expired or invalid');
    }
    return this.getTokenObject().authToken;
  }

  getTokenObject (): TokenObject {
    const token = localStorage.getItem(this.tokenKey);

    if (token) {
      return plainToClass(TokenObject, JSON.parse(token) as TokenObject);
    }

    return null;
  }

  hasCurrentValidToken (): boolean {
    const token = this.getTokenObject();

    if (token) {
      if (new Date(token.authTokenExpiration) > new Date()) {
        return true;
      }
    }

    return false;
  }

  hasFutureValidToken (): boolean {
    const token = this.getTokenObject();

    if (token && (new Date(token.refreshTokenExpiration) > new Date())) {
      return true;
    }

    return false;
  }

  loggedIn () {
    return this.hasCurrentValidToken() || this.hasFutureValidToken();
  }

  async refresh () {
    const clientIdentifier = this.getClientIdentifier();
    const { refreshToken } = this.getTokenObject();

    const result = await client.mutate<{ refresh: TokenObject }, RefreshArgument>({
      mutation: this.refresh$,
      variables: {
        clientIdentifier,
        refreshToken
      }
    });

    if (result.data) {
      this.setTokenObject(result.data.refresh);
    }
  }

  async login (
    username: string,
    password: string
  ) {
    const clientIdentifier = this.getClientIdentifier();

    const result = await client.mutate<{ login: TokenObject }, LoginArgument>({
      mutation: this.login$,
      variables: {
        username,
        password,
        clientIdentifier
      }
    });

    if (result.data) {
      this.setTokenObject(result.data.login);
    }
  }

  async logout () {
    try {
      const clientIdentifier = this.getClientIdentifier();

      await client.mutate<void, LogoutArgument>({
        mutation: this.logout$,
        variables: {
          clientIdentifier
        }
      });

      this.setTokenObject(null);
    } catch(e) {
      console.error(e);
    }
  }

  async trySomething () {
    try {
      const result = await client.query<{ something: string[] }>({
        query: this.something$
      });

      return result.data.something;
    } catch {
      return ['Unauthorized']
    }
  }
}

export const tokenManager = new TokenManager();
