export const findByField = (collectionItems, fieldToSearch, value) =>
  collectionItems.find((item)=> item[fieldToSearch] === value);
