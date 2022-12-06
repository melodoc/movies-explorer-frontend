import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import { ROUTES } from '../../constants/routes';

export const ProtectedRoute = ({
  component: Component,
  path,
  ...props
}) => {
  return (
    <Route exact path={path}>
      {() =>
        props.loggedIn ? (
          <Component  {...props} />
        ) : (
          <Redirect to={ROUTES.SignIn} />
        )
      }
    </Route>
  );
};
