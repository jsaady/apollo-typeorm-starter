import React from "react";
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter } from 'react-router-dom';
import { client } from "./lib/GraphQL";
import { Routes } from "./routes";
import './styles/index.scss';

export const App = () => (
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Routes></Routes>
    </BrowserRouter>
  </ApolloProvider>
);
