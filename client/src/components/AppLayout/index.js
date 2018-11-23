import React from 'react';
import * as R from 'ramda';
import { element } from 'prop-types';

import withLoader from 'utils/withLoader';
import withUser from 'utils/withUser';




const Wrapper = Component => {
    const AppLayout = (props) => (
        <div>
            <Component  {...props} />
        </div>
    );

    return R.compose(
        withLoader,
        withUser
    )(AppLayout);
};




Wrapper.propTypes = {
    Component: element.isRequired,
};



export default Wrapper;
