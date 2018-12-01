import Alert from 'react-s-alert';

const handleError = error => {
  Alert.error(error.message || error.error);

  if (process.env.NODE_ENV !== 'production') {
    console.log(error);
  }
};

export { handleError };
