import React from 'react';
import { array, func } from 'prop-types';
import { Col, Row, FormGroup, Label, Input, Button } from 'reactstrap';

const Answer = ({ answer, onRemove, onUpdate }) => (
  <FormGroup>
    <Label for="answerTitle">Answer</Label>
    <Row>
      <Col sm={10}>
        <Input
          type="text"
          name="title"
          id={answer._id}
          placeholder="Answer text"
          value={answer.title}
          onChange={onUpdate(answer._id)}
        />
      </Col>
      <Button close sm={1} onClick={() => onRemove(answer._id)} />
    </Row>
  </FormGroup>
);

Answer.propTypes = {
  answer: array,
  onRemove: func.isRequired,
  onUpdate: func.isRequired,
};

export default Answer;
