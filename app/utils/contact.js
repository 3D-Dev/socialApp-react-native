export const retrieveUserDataWithID = (contacts, users) => {
  const pendingWithUserData = [];
  contacts.forEach(pending => {
    const joinerID = users.users.findIndex(user => user._id === pending.joiner);
    const joiner = users.users[joinerID];
    pendingWithUserData.push({
      ...pending,
      joiner
    });
  });
  return pendingWithUserData;
};

export const retrieveMyContacts = (newContacts, users, status) => {
  const contacts = (newContacts || {}).contacts || [];
  const userList = (users || {}).users || [];
  let pendingWithUserData = [];

  if (contacts.length > 0 && userList.length > 0) {
    pendingWithUserData = retrieveUserDataWithID(contacts, users);
  }
  return pendingWithUserData.filter(item => item.status === status) || [];
};
