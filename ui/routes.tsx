import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { LazyRoute } from './lib/LazyRoute';

export const Routes = () => (
  <BrowserRouter>
    <Route path="/auth">
      <LazyRoute load={() => import('./features/Auth/index')} loading="Loading..."></LazyRoute>
    </Route>
  </BrowserRouter>
)
