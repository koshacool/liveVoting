import Alert from 'react-s-alert';

const handleError = error => {
  Alert.error(error.message || error.error);

  // eslint-disable-next-line no-undef
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log(error);
  }
};

export { handleError };
