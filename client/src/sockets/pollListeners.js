import { pollRemove, pollOnPublic, pollUnPublic, pollUpdate } from 'redux/polls/operations';
import { io } from 'utils/api';
import socketEvents from './events';

const { POLL_ON_PUBLIC, POLL_REMOVE, POLL_UNPUBLIC, POLL_UPDATE } = socketEvents;

const onPublicPoll = dispatch => {
  io.removeListener(POLL_ON_PUBLIC); // should remove prev listener before add new
  io.on(POLL_ON_PUBLIC, ({ poll }) => {
    console.log('public');
    return pollOnPublic(poll)(dispatch);
  });
};

const unPublicPoll = dispatch => {
  io.removeListener(POLL_UNPUBLIC);
  io.on(POLL_UNPUBLIC, ({ poll }) => {
    console.log('unpublic');
    return pollUnPublic(poll)(dispatch);
  });
};

const removePoll = dispatch => {
  io.removeListener(POLL_REMOVE);
  io.on(POLL_REMOVE, ({ poll }) => {
    console.log('remove');
    return pollRemove(poll._id)(dispatch);
  });
};

const updatePoll = dispatch => {
  io.removeListener(POLL_UPDATE);
  io.on(POLL_UPDATE, ({ poll }) => {
    console.log('upddate');
    return pollUpdate(poll)(dispatch);
  });
};

export { onPublicPoll, unPublicPoll, removePoll, updatePoll };
