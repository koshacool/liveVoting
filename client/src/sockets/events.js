const socketEvents = {
  POLL_UNPUBLIC: 'poll-unpublic',
  POLL_ON_PUBLIC: 'poll-on-public',
  POLL_UPDATE: 'poll-update',
  POLL_REMOVE: 'poll-remove',

  QUESTION_CREATE: 'question-create',
  QUESTION_UPDATE: 'question-update',
  QUESTION_REMOVE: 'question-remove',

  ANSWER_UPDATE: 'answer-update',
  ANSWER_CREATE: 'answer-create',
  ANSWERS_UPDATE_ON_VOTE: 'answers-update-on-vote',
  ANSWER_REMOVE: 'answer-remove',
};

export default socketEvents;
