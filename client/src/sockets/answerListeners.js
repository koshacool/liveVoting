import socketEvents from './events';
import { io } from 'utils/api';
import {
  answerUpdate,
  answerRemove,
  answerUpdateOnVote,
} from 'redux/answers/operations';

const { ANSWER_REMOVE, ANSWER_UPDATE, ANSWERS_UPDATE_ON_VOTE } = socketEvents;

const onRemoveAnswer = dispatch => {
  io.removeListener(ANSWER_REMOVE);
  io.on(ANSWER_REMOVE, ({ answer }) => answerRemove(answer._id)(dispatch));
};

const onUpdateAnswer = dispatch => {
  io.removeListener(ANSWER_UPDATE);
  io.on(ANSWER_UPDATE, ({ answer }) => answerUpdate(answer)(dispatch));
};

const onVoteUpdateAnswer = dispatch => {
  io.removeListener(ANSWERS_UPDATE_ON_VOTE);
  io.on(ANSWERS_UPDATE_ON_VOTE, ({ answers }) =>
    answerUpdateOnVote(answers)(dispatch));
};

export { onRemoveAnswer, onUpdateAnswer, onVoteUpdateAnswer };
