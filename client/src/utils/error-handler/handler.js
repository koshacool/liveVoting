import Alert from 'react-s-alert';

const handleError = error => {
  if (process.env.NODE_ENV !== 'production') {
    Alert.error(error.message);
    console.log(error);
  }
};

export { handleError };
