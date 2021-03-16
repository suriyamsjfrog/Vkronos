function isValidEmail(email) {
  var emailRegex = new RegExp(
    "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@vmware.com$"
  );
  return emailRegex.test(email);
}

function isValidPassword(pwd) {
  var passwordRegex = new RegExp(
    "^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})"
  );
  return passwordRegex.test(pwd);
}

function ValidCred(email, password, cpassword) {
  console.log("Inside Validate form ");
  let errors = [];
  console.log(email, password, cpassword);
  let checkEmail = !isValidEmail(email);
  let checkPwd = !isValidPassword(password);
  let checkCPwd = !(cpassword === password);

  //All values stored to the file are first validated

  if (checkEmail)
    errors.push({
      type: "email",
      message: "Enter a valid email",
    });

  if (checkPwd)
    errors.push({
      type: "password",
      message: "Password must be 6 digits long with atleast one numerical",
    });

  if (checkCPwd)
    errors.push({
      type: "cpassword",
      message: "Repeat password must match the password",
    });
  // All the info is to be autheticated again by the client before sending
  console.log(checkCPwd, checkEmail, checkPwd);
  if (checkCPwd || checkEmail || checkPwd) {
    return {
      status: false,
      errors: errors,
    };
  } else
    return {
      status: true,
      errors: errors,
    };
}

module.exports = ValidCred;
