export const compareObj = (newObject, previousObject) => {
  if (JSON.stringify(newObject) === JSON.stringify(previousObject)) {
    return { status: true };
  }
  const result = {};
  const keys = Object.keys(previousObject);

  for (const key in newObject) {
    if (!keys.includes(key) || newObject[key] !== previousObject[key]) {
      result[key] = newObject[key];
    }
  }

  return { status: false, result };
};
