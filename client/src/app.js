import React from 'react';
import { Switch } from 'react-router-dom';

import CoreLayout from './layouts/CoreLayout';
import ProtectedRoute from './layouts/ProtectedRoute';
import { MAIN_ROUTES } from './constants';

import './app.scss';


const App = props => (
  <div>
    <CoreLayout {...props}>
      <Switch>
        {MAIN_ROUTES.map(({ exact, path, component }, index) => (
          <ProtectedRoute
                  key={`${path}-${index}`}
                  path={path}
                  exact={exact}
                  component={component}
          />
        ))}
      </Switch>
    </CoreLayout>
  </div>
);

export default App;
