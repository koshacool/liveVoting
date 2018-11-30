const versionPart = '/api/v1';

export default {
  SIGN_IN: `${versionPart}/auth/sign-in`,
  SIGN_OUT: `${versionPart}/auth/sign-out`,
  AUTH: `${versionPart}/auth/user`,
  POLLS_CREATE: `${versionPart}/polls/create`,
  POLLS_LIST: `${versionPart}/polls/list`,
  POLL_ITEM: `${versionPart}/polls`,
  POLLS_UPDATE: `${versionPart}/polls`,

  QUESTION_CREATE: `${versionPart}/questions/create`,
  QUESTION_ITEM: `${versionPart}/questions`,
};
