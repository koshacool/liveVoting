import {post} from './api';
import APIAddresses from './api/urls';
import {handleError} from './error-handler';
import { unsetAuthToken } from './api/authorization';

export const onLogout = (unsetUser, setLoading) => async () => {
  try {
    setLoading(true);

    await post(APIAddresses.SIGN_OUT, {});
    unsetAuthToken();
    unsetUser();

    setLoading(false);
  } catch (error) {
    handleError(error);
    setLoading(false);
    throw error;
  }
};
