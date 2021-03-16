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
  email,
  password,
  username,
  U,
  squestion,
  sanswer
) => {
  try {
    let insertd = await pool.query(
      "Insert into Register values($1,$2,$3,$4,$5,$6) returning email,username",
      [username, email, password, U, squestion, sanswer]
    );
    console.log(insertd.rowCount);
    return insertd.rowCount;
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
