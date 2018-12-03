import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Card,
  CardTitle,
  CardText,
  Col,
  FormGroup,
  Button,
} from 'reactstrap';
import LinkButton from 'components/LinkButton';
import TogglePublicCheckbox from 'components/TogglePublicCheckbox';
import { VOTE } from 'routes';


const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;
const getHumanizeDuration = date =>
  moment.duration(new Date() - date).humanize();

const PollItem = ({ poll, onPublicityToggle, userId, onRemove }) => {
  const onPublicityToggleHandler = () => onPublicityToggle(poll, !poll.isPublic);
  const canEditPoll = poll.createdBy === userId;

  return (
    <Col xs={12} className="m-b-20">
      <Card body>
        <CardTitle>{poll.title || 'No title'}</CardTitle>
        <CardText>{getTimeAgo(moment(poll.createdAt))}</CardText>
        <FormGroup>

          {(canEditPoll || poll.isPublic) && (
            <LinkButton
              outline
              to={VOTE.replace(/:id/, poll._id)}
              label="Open"
            />
          )}

          {canEditPoll && (
            <LinkButton
              outline
              className='m-1'
              to={`edit-poll/${poll._id}`}
              label="Edit"
            />
          )}

          {canEditPoll && (
            <Button outline color="danger"  onClick={onRemove}>
              Remove
            </Button>
          )}

          {canEditPoll && (
            <TogglePublicCheckbox
              poll={poll}
              onPublicityToggle={onPublicityToggleHandler}
              className="m-4"
            />
          )}
        </FormGroup>
      </Card>
    </Col>
  );
};

PollItem.propTypes = {
  poll: PropTypes.object.isRequired,
  userId: PropTypes.string.isRequired,
  onRemove: PropTypes.func.isRequired,
  onPublicityToggle: PropTypes.func,
};

PollItem.defaultProps = {
  onPublicityToggle: () => true,
};

export default PollItem;
