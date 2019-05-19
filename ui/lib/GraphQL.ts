import ApolloClient from 'apollo-boost';
import unfetch from 'unfetch';
import { tokenManager } from './Token';

export const client = new ApolloClient({
  uri: '/graphql',
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
