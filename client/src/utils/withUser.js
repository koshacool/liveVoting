import { connect } from 'react-redux';
import { setUser, unsetUser } from 'redux/auth/authActions';

const withUser = connect(
  ({ auth }) => ({ user: auth.user }),
  { setUser, unsetUser }
);

export default withUser;
