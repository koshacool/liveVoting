import React from 'react';
import { element } from 'prop-types';

import withLoader from 'utils/withLoader';




const Wrapper = Component => {
    const AppLayout = (props) => (
        <div>
            <Component  {...props} />
        </div>
    );

    return withLoader(AppLayout);
};




Wrapper.propTypes = {
    Component: element.isRequired,
};



export default Wrapper;
