export const sortPolls = (poll1, poll2, field = 'createdAt') => {
  const value1 = poll1[field];
  const value2 = poll2[field];

  if (value1 < value2) return 1;
  if (value1 > value2) return -1;

  return 0;
};
