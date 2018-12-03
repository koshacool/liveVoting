import { onRemovePoll, onUpdatePoll, onPublicPoll, onUnPublicPoll } from './pollListeners';
import { onCreateQuestion, onUpdateQuestion, onRemoveQuestion } from './questionListeners';
import { onUpdateAnswer, onRemoveAnswer, onVoteUpdateAnswer, onCreateAnswer } from './answerListeners';
import { io } from 'utils/api';

const initSockets = (token, dispatch) => {
  io.emit('authenticate', { token });

  onRemovePoll(dispatch);
  onUpdatePoll(dispatch);
  onPublicPoll(dispatch);
  onUnPublicPoll(dispatch);

  onCreateQuestion(dispatch);
  onUpdateQuestion(dispatch);
  onRemoveQuestion(dispatch);

  onCreateAnswer(dispatch);
  onUpdateAnswer(dispatch);
  onRemoveAnswer(dispatch);
  onVoteUpdateAnswer(dispatch);
};

export default initSockets;
