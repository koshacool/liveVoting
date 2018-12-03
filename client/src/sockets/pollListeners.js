import { io } from 'utils/api';
import socketEvents from './events';
import {
  pollRemove,
  pollOnPublic,
  pollUnPublic,
  pollUpdate,
} from 'redux/polls/operations';

const { POLL_ON_PUBLIC, POLL_REMOVE, POLL_UNPUBLIC, POLL_UPDATE } = socketEvents;

const onPublicPoll = dispatch => {
  io.removeListener(POLL_ON_PUBLIC); // should remove prev listener before add new
  io.on(POLL_ON_PUBLIC, ({ poll }) => pollOnPublic(poll)(dispatch));
};

const onUnPublicPoll = dispatch => {
  io.removeListener(POLL_UNPUBLIC);
  io.on(POLL_UNPUBLIC, ({ poll }) => pollUnPublic(poll)(dispatch));
};

const onRemovePoll = dispatch => {
  io.removeListener(POLL_REMOVE);
  io.on(POLL_REMOVE, ({ poll }) => pollRemove(poll._id)(dispatch));
};

const onUpdatePoll = dispatch => {
  io.removeListener(POLL_UPDATE);
  io.on(POLL_UPDATE, ({ poll }) => pollUpdate(poll)(dispatch));
};

export { onPublicPoll, onUnPublicPoll, onRemovePoll, onUpdatePoll };
