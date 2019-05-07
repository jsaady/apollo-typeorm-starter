import ApolloClient from 'apollo-boost';
import { tokenManager } from './Token';
export const localStorageKey = 'TOKEN';
export const client = new ApolloClient({
  uri: 'http://localhost:4000',
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