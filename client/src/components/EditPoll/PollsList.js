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

import Question from './Question';
import TogglePublicCheckbox from 'components/TogglePublicCheckbox';

const getPollToEdit = (polls, pollId, user) => polls.find(poll =>
  poll._id === pollId && poll.createdBy === user._id);

class PollsList extends React.Component {
  componentDidMount() {
    const { polls, getPolls, match: { params }, user } = this.props;
    const pollId = params.id;

    if (!getPollToEdit(polls, pollId, user)) {
      getPolls();
    }
  }

  render() {
    const { user, polls, match: { params }, question } = this.props;
    const pollId = params.id;
    const poll = getPollToEdit(polls, pollId, user);
const mockQuestion = {
  title: 'what do yout think?',
  showResult: false,
};
const answers = [
  {
    title: 'asdfasdf',
  },
  {
    title: 'fffffffffff',
  }
];


    return poll ? (
      <Container className="mt-5">
        <Form>
          <FormGroup row>
            <Label for="editTitle">TITLE</Label>
            <Input type="text" name="title" id="editTitle"
                   placeholder="Poll title" />
          </FormGroup>

          <FormGroup row>
            <TogglePublicCheckbox
              poll={poll}
              onPublicityToggle={() => console.log('togle public')}
            />
          </FormGroup>

          <FormGroup>
            <Question question={mockQuestion} answers={answers} />
          </FormGroup>
        </Form>


        <Button
          onClick={this.createPoll}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
        >
          SAVE
        </Button>
      </Container>
    ) : null;
  }
}

PollsList.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default PollsList;
