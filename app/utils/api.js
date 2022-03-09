export const getLatestUpdateFromArray = data => {
  const latest = new Date(
    Math.max.apply(
      null,
      data.map(e => {
        return new Date(e.updated);
      })
    )
  );

  return latest;
};

export const removeDuplicates = data => {
  const nArray = data.filter((user, index) => {
    const nuser = JSON.stringify(user);
    return (
      index ===
      data.findIndex(obj => {
        return JSON.stringify(obj) === nuser;
      })
    );
  });
  return nArray;
};
