import { removePoll, updatePoll, onPublicPoll, unPublicPoll } from './listeners';
import { io } from 'utils/api';

const initSockets = (token, dispatch) => {
  io.emit('authenticate', { token });
  removePoll(dispatch);
  updatePoll(dispatch);
  onPublicPoll(dispatch);
  unPublicPoll(dispatch);
};

export default initSockets;
