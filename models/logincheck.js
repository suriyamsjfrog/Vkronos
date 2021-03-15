const pool = require("../utils/config");

module.exports.findemail = async (email) => {
  try {
    let email1 = await pool.query("select * from Register where email=$1", [
      email,
    ]);
    console.log(email1);
    return email1;
  } catch (error) {
    console.log(error);
  }
};

module.exports.insertdata = async (
  username,
  email,
  date,
  logintime,
  logouttime
) => {
  try {
    let insertdata = await pool.query(
      "insert into logintime values($1,$2,$3,$4,$5) returning username,email,currentdate,logintime ",
      [username, email, date, logintime, logouttime]
    );
    console.log("Inside insert data");
    console.log(insertdata);
    return insertdata.rowCount;
  } catch (error) {
    console.log("The person have already loggedin");
    return;
  }
};

module.exports.finddata = async (date, email) => {
  try {
    let email1 = await pool.query(
      "select * from logintime where email=$1 and currentdate=$2",
      [email, date]
    );
    console.log(email1.rows);
    return email1;
  } catch (error) {
    console.log(error);
  }
};

module.exports.findusertype = async (email) => {
  try {
    let usertype = await pool.query(
      "select * from staff_admin where email_address=$1",
      [email]
    );
    console.log(usertype.rows);
    return usertype.rows;
  } catch (error) {
    console.log("The user doesnt exist in staff admin database");
  }
};
