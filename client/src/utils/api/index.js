import axios from 'axios';
import APIAddresses from './urls';
import { io } from './sockets';
import { getTokenHeaderObject } from './authorization';

const { NODE_ENV } = process.env;
const rootUrl = NODE_ENV === 'production' ? '' : 'http://localhost:3001';

const makeRequest = async (type, url, data, token) => {
  try {
    const headers = getTokenHeaderObject(token);

    return await axios({
      url: `${rootUrl}${url}`,
      data,
      method: type,
      headers,
    });
  } catch (error) {
    console.log(error);
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
