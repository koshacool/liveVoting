import { GET_PRIVATE, GET_PUBLIC, CREATE, UPDATE, REMOVE } from './types';

const initialState = {
  private: [],
  public: [],
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
    case GET_PRIVATE:
      return { ...state, private: payload.polls };
    case GET_PUBLIC:
      return { ...state, public: payload.polls };
    case CREATE:
      return { ...state, private: state.private.concat([payload.poll]) };
    case UPDATE:
      return {
        ...state,
        private: updpatePoll(state.private, payload.poll),
        public: updpatePoll(state.public, payload.poll)
      };
    case REMOVE:
      return {
        ...state,
        private: state.private.filter(({ _id }) => _id !== payload.id),
        public: state.public.filter(({ _id }) => _id !== payload.id),
      };
    default:
      return state;
  }
};

export default pollsReducer;
