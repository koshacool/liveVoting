import { connect } from 'react-redux';
import setLoading from 'redux/loader/loaderActions';

const withLoader = connect(
  null,
  { setLoading }
);

export default withLoader;
