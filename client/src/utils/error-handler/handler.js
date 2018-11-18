const handleError = (error) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(error);
  }
};

export { handleError };
