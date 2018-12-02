import React from 'react';
import PropTypes from 'prop-types';

import {  Button } from 'reactstrap';




const Answer = ({ answer, onAnswerChoose, color, enabled, votedAlready }) => (
  <Button
    raised
    primary
    className="answer-button"
    onClick={onAnswerChoose}
    style={{ backgroundColor: color }}
    disabled={!!votedAlready}
  >
    {answer.title}
  </Button>
);


Answer.propTypes = {
  answer: PropTypes.object.isRequired,
  onAnswerChoose: PropTypes.func.isRequired,
  color: PropTypes.string.isRequired,
  enabled: PropTypes.bool.isRequired,
  votedAlready: PropTypes.bool.isRequired,
};


export default Answer;
