import { connect } from 'react-redux';
import { onGoogleResponse, getUser, unsetUser } from 'redux/auth/operations';

const withUser = connect(
  ({ auth }) => ({ user: auth.user }),
  { onGoogleResponse, getUser, unsetUser }
);

export default withUser;
