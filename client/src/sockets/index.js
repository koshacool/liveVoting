import { removePoll, updatePoll, onPublicPoll, unPublicPoll } from './pollListeners';
import { onUpdateAnswer, onRemoveAnswer, onVoteUpdateAnswer } from './answerListeners';
import { io } from 'utils/api';

const initSockets = (token, dispatch) => {
  io.emit('authenticate', { token });

  removePoll(dispatch);
  updatePoll(dispatch);
  onPublicPoll(dispatch);
  unPublicPoll(dispatch);

  onUpdateAnswer(dispatch);
  onRemoveAnswer(dispatch);
  onVoteUpdateAnswer(dispatch);
};

export default initSockets;
