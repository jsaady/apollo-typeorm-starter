import React, { Props } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';
import { tokenManager } from './Token';
console.log(tokenManager);
export function PrivateRoute({ component: Component, children,...rest }: RouteProps & Props<any>) {
  return (
    <Route
      {...rest}
      render={props =>
        tokenManager.loggedIn() ? (
          Component ? <Component {...props} /> : children
        ) : (
          <Redirect
            to={{
              pathname: "/auth/login",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}