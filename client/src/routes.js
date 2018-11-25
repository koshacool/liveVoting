import Home from 'pages/Home/index';
import MyPolls from 'pages/MyPolls/index';
import PublicPolls from 'pages/PublicPolls/index';
import NotFound from 'pages/NotFound/index';
import Login from 'pages/Login/index';

export const LOGIN_URL = '/login';
export const HOME_URL = '/';
export const MY_POLLS = '/my-polls';
export const EDIT_POLL = '/edit-poll/:id';
export const PUBLIC_POLLS = '/public-polls';
export const NOT_FOUND = '/not-found';

export const PRIVATE_ROUTES = [
  {
    title: 'Home',
    path: HOME_URL,
    component: Home,
    exact: true,
  },
  {
    title: 'My Polls',
    path: MY_POLLS,
    component: MyPolls,
  },
  {
    title: 'Public Polls',
    path: PUBLIC_POLLS,
    component: PublicPolls,
  },
];

export const PUBLIC_ROUTES = [
  {
    title: 'Login',
    path: LOGIN_URL,
    component: Login,
    exact: true,
  },
  {
    title: 'Not Found',
    path: '*',
    component: NotFound,
  },
];
