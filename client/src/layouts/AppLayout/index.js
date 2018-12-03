import { compose } from 'redux'
import { element } from 'prop-types';

import withLoader from 'utils/withLoader';
import withUser from 'utils/withUser';


const AppLayout = compose(
  withLoader,
  withUser
);

AppLayout.propTypes = {
  Component: element.isRequired,
};

export default AppLayout;
