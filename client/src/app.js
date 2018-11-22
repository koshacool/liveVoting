import React from 'react';
import { Switch, Route, Inde } from 'react-router-dom';

import Alert from 'react-s-alert';

import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/genie.css';

import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import AppLayout from './components/AppLayout';
import Loader from 'components/Loader';

import { routeList } from './pages/routes';

import './app.scss';

const ALERTS_LIMIT = 3;
const TIMEOUT = 3000;

const Main = () => (
    <div>
        <Switch>
            <Route path={routeList.LOGIN} component={AppLayout(LoginPage)} />

            <Route exact path={routeList.HOME} component={AppLayout(HomePage)} />
        </Switch>

        <Alert stack={{ limit: ALERTS_LIMIT }} timeout={TIMEOUT} position="bottom" />
        <Loader  />
    </div>
);

export default Main;
