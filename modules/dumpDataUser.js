module.exports = (temp, user) => {
  let output = temp.replace(/{%USER_NAME%}/g, user.name);
  output = output.replace(/{%USER_PHONE%}/g, user.phone);

  return output;
};
