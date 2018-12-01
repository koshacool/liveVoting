export const findOneByField = (collectionItems, fieldToSearch, value) =>
  collectionItems.find(item => item[fieldToSearch] === value);

export const findAllByField = (collectionItems, fieldToSearch, value) =>
  collectionItems.filter(item => item[fieldToSearch] === value);
