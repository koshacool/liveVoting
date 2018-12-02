import React from 'react';
import { func, object, string } from 'prop-types';
import {
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  CustomInput,
} from 'reactstrap';

import withQuestions from 'utils/withQuestions';
import Answers from './AnswersList';
import ControlledInput from 'components/ControlledInput';

const Question = (props) => {
  const {
    pollId, question, createQuestion, removeQuestion, updateQuestion,
  } = props;

  const onChangeQuestion = questionId => ({ target }) => {
    const { name, value, checked } = target;
    updateQuestion(questionId,
      { [name]: name === 'showResult' ? checked : value });
  };

  return question
    ? (
      <FormGroup>
        <div>
          <FormGroup>
            <Label for="questionTitle">Question</Label>
            <Row>
              <Col sm={11}>
                <ControlledInput
                  id={`${question._id}-title`}
                  type="text"
                  name="title"
                  placeholder="Question text"
                  onChange={onChangeQuestion(question._id)}
                />
              </Col>
              <Button close sm={1}
                      onClick={() => removeQuestion(question._id)} />
            </Row>
          </FormGroup>

          <FormGroup>
            <CustomInput
              type="checkbox"
              label="Show voting results"
              inline
              id={`${question._id}-publish`}
              name="showResult"
              checked={question.showResult}
              onChange={onChangeQuestion(question._id)}
            />
          </FormGroup>

          <Answers questionId={question._id} />
        </div>
      </FormGroup>
    ) : (
      <div>
        <h3>No questions</h3>
        <Button onClick={() => createQuestion(pollId)}>Add question</Button>
      </div>
    );
};

Question.propTypes = {
  pollId: string,
  question: object,
  createQuestion: func,
  removeQuestion: func,
  updateQuestion: func,
};

export default withQuestions(Question);
