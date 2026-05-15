export const checkObjNotEmpty = (obj) => {
  // Iterate over each property in the object
  for (let key in obj) {
    // Skip checking the key 'free_domain'
    if (key === 'free_domain') {
      continue;
    }
    // Check if the value is either empty, null, or undefined
    if (obj[key] === null || obj[key] === '' || obj[key] === undefined) {
      return false; // Return false if any field is invalid
    }
  }
  return true; // Return true if all fields are valid (excluding 'free_domain')
};
