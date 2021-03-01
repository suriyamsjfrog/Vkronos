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

module.exports.insertdata=async(username,email,date,logintime,logouttime)=>{
    try{
        let insertdata=await pool.query('insert into logintime values($1,$2,$3,$4,$5) ',[username,email,date,logintime,logouttime]);
        console.log()
        return insertdata.rowCount;
    }catch(error){
        console.log(error);
    }
}