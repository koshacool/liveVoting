import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

import { CustomInput } from 'reactstrap';

const Answer = answer => (
  <FormGroup>
    <Label for="answerTitle">Answer</Label>
    <Row>
      <Col sm={11}>
        <Input
          type="text"
          name="answerTitle"
          id="answerTitle"
          placeholder="Answer text"
          value={answer.title}
        />
      </Col>
      <Button close sm={1} onClick={() => console.log('show answer')} />
    </Row>
  </FormGroup>
);

const Answers = ({ answers }) => {
  return (
    <div className="p-3">
      {
        answers.length
          ? answers.map(answer => <Answer answer={answer} />)
          : <h3>No answers</h3>
      }
      <Button onClick={() => console.log('add')}>Add answer</Button>
    </div>
  );

};

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
};

export default Answers;
