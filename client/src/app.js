import React from 'react';
import { Route, Switch } from 'react-router-dom';

import AppLayout from 'layouts/AppLayout';
import CoreLayout from './layouts/CoreLayout';
import AuthLayout from './layouts/AuthLayout';

import Login from 'pages/Login';
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from 'routes';

import './app.scss';


const App = props => (
    <CoreLayout {...props}>
      <Switch>
      {PRIVATE_ROUTES.map(({ exact, path, component }, index) => (
          <Route  key={index} exact={exact} path={path} component={AuthLayout(component)} />
        ))}

      {PUBLIC_ROUTES.map(({ exact, path, component }, index) => (
          <Route  key={index} exact={exact} path={path} component={AppLayout(component)} />
        ))}
      </Switch>
    </CoreLayout>
);

export default App;
