const Permission = (array, data) => {
   let filtered = array.filter((row) => row == data);
   return filtered.length > 0 ? true : false;
};

export { Permission };
