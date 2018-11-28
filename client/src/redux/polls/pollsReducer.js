import { GET_POLLS, CREATE_POLLS, UPDATE_POLLS, REMOVE_POLLS } from './types';
import { sortPolls } from 'utils/sortPolls';

const initialState = {
  polls: [],
};

const updpatePoll = (polls, poll) => {
  const newArr = [...polls];
  const index = newArr.findIndex(({ _id }) => _id === poll._id);

  if (index < 0) {
    return newArr;
  }

  newArr[index] = poll;
  return newArr;
};


const pollsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_POLLS:
      return { ...state, polls: payload.polls };
    case CREATE_POLLS:
      return { ...state, polls: state.polls.concat([payload.poll]).sort(sortPolls) };
    case UPDATE_POLLS:
      return {
        ...state,
        polls: updpatePoll(state.polls, payload.poll),
      };
    case REMOVE_POLLS:
      return {
        ...state,
        polls: state.polls.filter(({ _id }) => _id !== payload.id),
      };
    default:
      return state;
  }
};

export default pollsReducer;
