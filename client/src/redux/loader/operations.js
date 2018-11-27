import { setLoading } from './loaderActions';

/**
 *
 * @param { boolean } loading Value to torn on/off loader
 */
export const switchLoader = loading => async dispatch =>
  dispatch(setLoading(loading));
