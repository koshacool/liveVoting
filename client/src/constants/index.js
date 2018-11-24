import MyPolls from 'pages/MyPolls';
import NotFound from 'pages/NotFound';
import Login from 'pages/Login';


export const LOGIN_URL = '/login';
export const HOME_URL = '/';
export const MY_POLLS = '/my-polls';
export const PUBLI_POLLS = '/public-polls';
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
