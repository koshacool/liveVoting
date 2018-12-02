import axios from 'axios';
import APIAddresses from './urls';
import { io } from './sockets';
import { getTokenHeaderObject } from './authorization';
import { switchLoader } from 'redux/loader/operations';
import { handleError } from 'utils/error-handler';

// eslint-disable-next-line no-undef
const { NODE_ENV } = process.env;
const rootUrl = NODE_ENV === 'production' ? '' : 'http://localhost:3001';

const makeRequest = async (type, url, data, dispatch) => {
  try {
    switchLoader(true)(dispatch);
    const headers = getTokenHeaderObject();

    const result = await axios({
      url: `${rootUrl}${url}`,
      data,
      method: type,
      headers,
    });

    switchLoader(false)(dispatch);
    return result;
  } catch (error) {
    handleError(error);
    switchLoader(false)(dispatch);
    throw error;
  }
};

// Requests to server
const get = (url, ...args) => makeRequest('get', url, null, ...args);
const post = (url, ...args) => makeRequest('post', url, ...args);
const put = (url, ...args) => makeRequest('put', url, ...args);
const remove = (url, ...args) => makeRequest('delete', url, ...args);
const patch = (url, ...args) => makeRequest('patch', url, ...args);

export { APIAddresses, get, post, put, remove, patch, io };
