import React from "react";
import { ApolloProvider } from 'react-apollo';
import { client } from "./lib/GraphQL";
import { Routes } from "./routes";

export const App = () => (
  <ApolloProvider client={client}>
    <Routes></Routes>
  </ApolloProvider>
);
