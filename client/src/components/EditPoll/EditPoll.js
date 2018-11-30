import React from 'react';
import PropTypes from 'prop-types';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from 'reactstrap';

import { findByField } from 'utils/helpers';
import Question from './Question';
import TogglePublicCheckbox from 'components/TogglePublicCheckbox';

class EditPoll extends React.Component {
  componentDidMount() {
    const { getPollToEdit } = this.props;
    const pollId = this.getPollId();

    getPollToEdit(pollId);
  }

  getPollId = () => {
    const { match: { params } } = this.props;
    return params.id;
  }

  getCurrentPoll = () => {
    const { polls, questions, answers = [] } = this.props;
    const pollId = this.getPollId();
    return findByField(polls, '_id', pollId);
  }

  onChangePoll = pollId =>  ({ target }) => {
    const { updatePoll } = this.props;
    const { name, value, checked } = target;

    updatePoll(pollId,  { [name]: name === 'isPublic' ? checked : value });
  }



  render() {
    const { answers = [{title: 123}] } = this.props;
    const pollId = this.getPollId();
    const poll = this.getCurrentPoll();

    return poll ? (
      <Container className="mt-5">
        <Form>
          <FormGroup row>
            <Label for="editTitle">TITLE</Label>
            <Input
              type="text"
              name="title"
              id="editTitle"
              placeholder="Poll title"
              value={poll.title}
              onChange={this.onChangePoll(poll._id)}
            />
          </FormGroup>

          <FormGroup row>
            <TogglePublicCheckbox
              poll={poll}
              onPublicityToggle={this.onChangePoll(poll._id)}
              name="isPublic"
            />
          </FormGroup>


            <Question
              pollId={pollId}
            />
        </Form>


        <Button
          onClick={this.createPoll}
          style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          disabled
        >
          SAVE
        </Button>
      </Container>
    ) : null;
  }
}

EditPoll.propTypes = {
  polls: PropTypes.array.isRequired,
};

export default EditPoll;
