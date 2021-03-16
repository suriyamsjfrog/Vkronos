const pool = require("../utils/config");

module.exports.findandchange = async (email, squestion, sanswer) => {
  try {
    let result = await pool.query(
      "select * from register where squestion=$1 and sanswer=$2 and email=$3",
      [squestion, sanswer, email]
    );
    console.log(result.rowCount);
    return result.rowCount;
  } catch (error) {}
};

module.exports.updatepass = async (email, password) => {
  try {
    let result = await pool.query(
      "update register set pass=$1 where email=$2",
      [password, email]
    );
    console.log(result.rowCount);
    return result.rowCount;
  } catch (error) {
    console.log(error);
  }
};
