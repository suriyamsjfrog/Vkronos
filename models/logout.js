const pool=require('../utils/config')

module.exports.insertlogoutdata=async(email,logout,date)=>{
    try{
        let T=true;
        let F=false;
        console.log(email);
        console.log(logout);
        console.log(date);
        let email1=await pool.query('update logintime set logouttime=$1,logoutcheck=$2 where email=$3 and currentdate=$4 and logoutcheck=$5',[logout,T,email,date,F] );
        console.log(email1.rowCount);
        return email1.rowCount;
    }
    catch(error){
        console.log(error);
    }
}