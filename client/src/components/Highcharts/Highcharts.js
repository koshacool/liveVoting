import React from 'react';
import { array } from 'prop-types';
import ReactHighcharts from 'react-highcharts';

import { getChartConfig } from './getConfig';


const Highcharts = ({ answers, colors }) =>
  <ReactHighcharts config={getChartConfig(answers, colors)} />;


Highcharts.propTypes = {
  answers: array.isRequired,
  colors: array.isRequired,
};

export default Highcharts;
