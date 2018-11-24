import React from 'react';
import PropTypes from 'prop-types';
// import moment from 'moment';


import { Col, Card, CardTitle, Checkbox } from 'reactstrap';





// const getCheckboxId = poll => `checkbox-${poll._id}`;
//
// const getHumanizeDuration = date => moment.duration(new Date() - date).humanize();
//
// const getTimeAgo = date => `${getHumanizeDuration(date)} ago`;


const PollItem = ({ poll, onPublicityToggle }) => {
  // const onPublicityToggleHandler = isChecked => onPublicityToggle(isChecked, poll._id);

  // const canEditPoll = poll.createdBy === Meteor.userId();

  return (
    <Col xs={12} className="m-b-20">
      {/*<Card>*/}
      {/*<CardTitle*/}
      {/*title={poll.title}*/}
      {/*subtitle={getTimeAgo(poll.createdAt)}*/}
      {/*/>*/}

      {/*<CardActions>*/}
      {/*<LinkButton*/}
      {/*flat*/}
      {/*to={`vote/${poll._id}`}*/}
      {/*label="Open"*/}
      {/*/>*/}

      {/*{canEditPoll && (*/}
      {/*<LinkButton*/}
      {/*flat*/}
      {/*to={`edit-poll/${poll._id}`}*/}
      {/*label="Edit"*/}
      {/*/>*/}
      {/*)}*/}

      {/*{canEditPoll && (*/}
      {/*<Checkbox*/}
      {/*id={getCheckboxId(poll)}*/}
      {/*name={getCheckboxId(poll)}*/}
      {/*label="public"*/}
      {/*checked={poll.isPublic}*/}
      {/*onChange={onPublicityToggleHandler}*/}
      {/*/>*/}
      {/*)}*/}
      {/*</CardActions>*/}
      {/*</Card>*/}

      pollItem
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
