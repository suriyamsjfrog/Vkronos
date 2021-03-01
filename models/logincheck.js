const pool=require('../utils/config')

module.exports.findemail=async(email)=>{
    try{
        let email1=await pool.query('select * from login where email=$1',[email]);
        console.log(email1);
        return email1;
    }
    catch(error){
        console.log(error);
    }
}