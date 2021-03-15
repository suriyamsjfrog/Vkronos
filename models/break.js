const pool = require("../utils/config");

module.exports.breakupdate = async (date, break1, username) => {
  try {
    let updatebreak = await pool.query(
      "update logintime set break=break+$1 where username=$2 and currentdate=$3",
      [break1, username, date]
    );
    console.log(email1);
    return email1;
  } catch (error) {
    console.log(error);
  }
};

module.exports.findbreak = async (date, email) => {
  try {
    let findb = await pool.query(
      "select * from logintime where email=$1 and currentdate=$2",
      [email, date]
    );
    console.log(findb.rows);
    return findb.rows;
  } catch (error) {
    console.log(error);
  }
};
