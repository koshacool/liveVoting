import React from 'react';
import { Link } from 'react-router-dom';
import { object, array, func } from 'prop-types';
import {
  Container,
  Button,
  Form,
  FormGroup,
  Label,
} from 'reactstrap';

import { findOneByField } from 'utils/helpers';
import TogglePublicCheckbox from 'components/TogglePublicCheckbox';
import Question from './Question';
import ControlledInput from 'components/ControlledInput';
import { VOTE } from 'routes';

class EditPoll extends React.Component {
  static propTypes = {
    polls: array.isRequired,
    match: object.isRequired,
    updatePoll: func.isRequired,
    getPollToEdit: func.isRequired,
  };

  componentDidMount() {
    const { getPollToEdit } = this.props;
    const pollId = this.getPollId();

    getPollToEdit(pollId);
  }

  getPollId = () => {
    const { match: { params } } = this.props;
    return params.id;
  };

  getCurrentPoll = () => {
    const { polls } = this.props;
    const pollId = this.getPollId();
    return findOneByField(polls, '_id', pollId);
  };

  onChangePoll = pollId => ({ target }) => {
    const { updatePoll } = this.props;
    const { name, value, checked } = target;

    updatePoll(pollId, { [name]: name === 'isPublic' ? checked : value });
  };

  render() {
    const pollId = this.getPollId();
    const poll = this.getCurrentPoll();

    return poll ? (
      <Container className="mt-5">
        <Form>
          <FormGroup row>
            <Label for="editTitle">TITLE</Label>
            <ControlledInput
              type="text"
              name="title"
              id={pollId}
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

          <Question pollId={pollId} />
        </Form>

        <Link to={VOTE.replace(/:id/, pollId)}>
          <Button
            style={{ position: 'fixed', bottom: '20px', right: '20px' }}
          >
            OPEN
          </Button>
        </Link>
      </Container>
    ) : null;
  }
}


export default EditPoll;
