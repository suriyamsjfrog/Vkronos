const pool=require('../utils/config')

module.exports.findemail=async(email)=>{
    try{
        let email1=await pool.query('select * from Register where email=$1',[email]);
        console.log(email1);
        return email1;
    }
    catch(error){
        console.log(error);
    }
}

module.exports.insertdata=async(email,password,username)=>{
    try{
        let insertd=await pool.query('Insert into Register values($1,$2,$3) returning email,username',[username,email,password]);
        console.log(insertd.rowCount);
        return insertd.rowCount;
    }catch(error){
        console.log(error);
    }
}