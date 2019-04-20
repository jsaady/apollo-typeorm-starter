import React from 'react';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';
import { LazyRoute } from './lib/LazyRoute';
import { PrivateRoute } from './lib/ProtectedRoute';

export const Routes = () => (
  <BrowserRouter>

    <div>
      <Route path="/auth">
        <LazyRoute load={() => import('./features/Auth/index')} loading="Loading..."></LazyRoute>
      </Route>
      <PrivateRoute path="/home">
        <LazyRoute load={() => import('./features/Home/index')} loading="Loading..."></LazyRoute>
      </PrivateRoute>
    </div>
  </BrowserRouter>
)
