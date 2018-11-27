import { connect } from 'react-redux';
import { onGoogleResponse, getUser, onLogout, checkUser } from 'redux/auth/operations';

const withUser = connect(
  ({ auth }) => ({ user: auth.user }),
  { onGoogleResponse, getUser, onLogout, checkUser }
);

export default withUser;
