import React from 'react';
import { func, object, string } from 'prop-types';
import {
  Col,
  Row,
  Button,
  FormGroup,
  Label,
  Input,
  CustomInput,
} from 'reactstrap';

import withQuestions from 'utils/withQuestions';
import Answers from './AnswersList';

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
                <Input
                  type="text"
                  name="title"
                  placeholder="Question text"
                  value={question.title}
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
              id={question._id}
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
  question: object,
  pollId: string,
  createQuestion: func,
  removeQuestion: func,
  updateQuestion: func,
};

export default withQuestions(Question);
