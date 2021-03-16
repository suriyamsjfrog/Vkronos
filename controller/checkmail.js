module.exports.isValidmail = (email) => {
  var emailRegex = new RegExp(
    "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@vmware.com$"
  );
  return emailRegex.test(email);
};
