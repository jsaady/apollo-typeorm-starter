import ApolloClient from 'apollo-boost';
import unfetch from 'unfetch';
import { tokenManager } from './Token';

export const localStorageKey = 'TOKEN';
export const client = new ApolloClient({
  uri: 'http://localhost:8080',
  fetch: unfetch,
  request: async (config) => {
    const isRefreshing = config.operationName.toLowerCase().includes('refresh');
    if (tokenManager.loggedIn() && !isRefreshing) {
      const token = await tokenManager.getLatestToken();
      config.setContext({
        headers: {
          Authorization: 'Bearer ' + token
        }
      });
    }
  }
});
