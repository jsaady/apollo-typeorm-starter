import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { Notifier } from './core/components/Notifier';
import { LazyRoute } from './lib/LazyRoute';
import { PrivateRoute } from './lib/ProtectedRoute';

export const Routes = () => (
  <div>
    <Switch>
      <Route path="/auth">
        <LazyRoute load={() => import('./features/Auth/index')} loading="Loading..."></LazyRoute>
      </Route>
      <PrivateRoute path="/home">
        <LazyRoute load={() => import('./features/Home/index')} loading="Loading..."></LazyRoute>
      </PrivateRoute>
      <Redirect to="/home" />
    </Switch>

    <Notifier />
  </div>
)
