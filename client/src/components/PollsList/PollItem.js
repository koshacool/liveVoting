import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Card,
  CardTitle,
  CardText,
  Col,
  FormGroup,
  CustomInput,
  Button
} from 'reactstrap';
import LinkButton from 'components/LinkButton';


const getCheckboxId = poll => `checkbox-${poll._id}`;

const getHumanizeDuration = date => moment.duration(new Date() - date).
  humanize();

const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;

const PollItem = ({ poll, onPublicityToggle, userId, onRemove }) => {
  const onPublicityToggleHandler = () => onPublicityToggle(poll);
  const canEditPoll = poll.createdBy === userId;

  return (
    <Col xs={12} className="m-b-20">
      <Card body>
        <CardTitle>{poll.title}</CardTitle>
        <CardText>{getTimeAgo(moment(poll.createdAt))}</CardText>
        <FormGroup>

          {canEditPoll && (
            <Button outline color="danger" className='mr-1' onClick={onRemove}>
              Remove
            </Button>
          )}

          {canEditPoll && (
            <LinkButton
              outline
              to={`edit-poll/${poll._id}`}
              label="Edit"
            />
          )}

          {canEditPoll && (
            <CustomInput
                type="checkbox"
                className="ml-4"
                id={getCheckboxId(poll)}
                name={getCheckboxId(poll)}
                checked={poll.isPublic}
                onChange={onPublicityToggleHandler}
                label="Public"
                inline
            />
          )}


        </FormGroup>
      </Card>
    </Col>
  );
};

PollItem.defaultProps = {
  onPublicityToggle: () => true,
};

PollItem.propTypes = {
  poll: PropTypes.object.isRequired,

  onPublicityToggle: PropTypes.func,
};

export default PollItem;
