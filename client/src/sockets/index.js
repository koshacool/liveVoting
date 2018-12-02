import { removePoll, updatePoll, onPublicPoll, unPublicPoll } from './pollListeners';
import { onCreateQuestion, onUpdateQuestion, onRemoveQuestion } from './questionListeners';
import { onUpdateAnswer, onRemoveAnswer, onVoteUpdateAnswer, onCreateAnswer } from './answerListeners';
import { io } from 'utils/api';

const initSockets = (token, dispatch) => {
  io.emit('authenticate', { token });

  removePoll(dispatch);
  updatePoll(dispatch);
  onPublicPoll(dispatch);
  unPublicPoll(dispatch);

  onCreateQuestion(dispatch);
  onUpdateQuestion(dispatch);
  onRemoveQuestion(dispatch);

  onCreateAnswer(dispatch);
  onUpdateAnswer(dispatch);
  onRemoveAnswer(dispatch);
  onVoteUpdateAnswer(dispatch);
};

export default initSockets;
