import socketEvents from './events';
import { io } from 'utils/api';
import {
  questionCreate,
  questionUpdate,
  questionRemove,
} from 'redux/questions/operations';

const {
  QUESTION_CREATE,
  QUESTION_UPDATE,
  QUESTION_REMOVE,
} = socketEvents;

const onCreateQuestion = dispatch => {
  io.removeListener(QUESTION_CREATE);
  io.on(QUESTION_CREATE, ({ question }) => questionCreate(question)(dispatch));
};

const onUpdateQuestion = dispatch => {
  io.removeListener(QUESTION_UPDATE);
  io.on(QUESTION_UPDATE, ({ question }) => questionUpdate(question)(dispatch));
};

const onRemoveQuestion = dispatch => {
  io.removeListener(QUESTION_REMOVE);
  io.on(QUESTION_REMOVE, ({ _id }) => questionRemove(_id)(dispatch));
};


export { onCreateQuestion, onUpdateQuestion, onRemoveQuestion };
