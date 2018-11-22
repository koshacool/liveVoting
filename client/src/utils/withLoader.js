import { connect } from 'react-redux';
import setLoading from 'redux/actions/loader';

const withLoader = connect(
  null,
  { setLoading }
);

export default withLoader;
