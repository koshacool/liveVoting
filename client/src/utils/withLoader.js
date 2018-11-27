import { connect } from 'react-redux';
import { switchLoader } from 'redux/loader/operations';

const withLoader = connect(
  null,
  { switchLoader }
);

export default withLoader;
