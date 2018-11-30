import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Input,
  CustomInput
} from 'reactstrap';

import withQuestions from 'utils/withQuestions';
import { findByField } from 'utils/helpers';
import Answers from "./Answers";


const Question = (props) => {
  const { pollId, questions, createQuestion, removeQuestion, updateQuestion, children,  } = props;

  const question = findByField(questions, 'pollId', pollId);

  const onChangeQuestion = questionId =>  ({ target }) => {
    const { name, value, checked } = target;
    updateQuestion(questionId,  { [name]: name === 'showResult' ? checked : value });
  }


  return question
    ? (
      <FormGroup>
      <div>
        <FormGroup>
          <Label for="questionTitle">Question</Label>
          <Row>
            <Col sm={11}>
              <Input
                type="text"
                name="title"
                placeholder="Question text"
                value={question.title}
                onChange={onChangeQuestion(question._id)}
              />
            </Col>
            <Button close sm={1} onClick={() => removeQuestion(question._id)} />
          </Row>
        </FormGroup>

        <FormGroup>
            <CustomInput
              type="checkbox"
              label="Show voting results"
              inline
              id={question._id}
              row
              name="showResult"
              checked={question.showResult}
              onChange={onChangeQuestion(question._id)}
            />
        </FormGroup>

        <Answers
          answers={[{}, {}]}
        />
      </div>
      </FormGroup>
    ) : <div>
      <h3>No questions</h3>
      <Button onClick={() => createQuestion(pollId)}>Add question</Button>
    </div>;

};

Question.propTypes = {
  question: PropTypes.object.isRequired,
  answers: PropTypes.array.isRequired,
};

export default withQuestions(Question);
