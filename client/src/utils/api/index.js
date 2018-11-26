import axios from 'axios';
import APIAddresses from './urls';
import { io } from './sockets';
import { getTokenHeaderObject } from './authorization';
import setLoading from 'redux/loader/loaderActions';
import { handleError } from 'utils/error-handler';

const { NODE_ENV } = process.env;
const rootUrl = NODE_ENV === 'production' ? '' : 'http://localhost:3001';

const makeRequest = async (type, url, data, dispatch, token) => {
  console.log(url, data, dispatch)
  try {
    dispatch(setLoading(true));
    const headers = getTokenHeaderObject(token);

    const result = await axios({
      url: `${rootUrl}${url}`,
      data,
      method: type,
      headers,
    });

    dispatch(setLoading(false));
    return result;
  } catch (error) {
    handleError(error);
    dispatch(setLoading(false));
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
