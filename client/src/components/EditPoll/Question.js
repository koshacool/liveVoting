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
import Answers from './Answers';

const Question = ({ question, answers }) => {
  return question
    ? (
      <div>
        <FormGroup>
          <Label for="questionTitle">Question</Label>
          <Row>
            <Col sm={11}>
              <Input
                type="text"
                name="questionTitle"
                id="questionTitle"
                placeholder="Question text"
              />
            </Col>
            <Button close sm={1} onClick={() => console.log('show answer')} />
          </Row>
        </FormGroup>

        <FormGroup>
            <CustomInput
              type="checkbox"
              label="Show voting result"
              inline
              row
              onClick={() => console.log('show answer')}
            />
        </FormGroup>



          <Answers
            answers={answers}
          />
      </div>
    ) : <div>
      <h3>No questions</h3>
      <Button onClick={() => console.log('add')}>Add question</Button>
    </div>;

};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
};

export default Question;
