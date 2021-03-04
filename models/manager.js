const pool=require('../utils/config')

module.exports.dropdownlist=async(email)=>{
 
    try{
        let get_manager_data=await pool.query("select * from staff_admin where email_address=$1",[email]);
        console.log(get_manager_data.rows[0]);
        let first_name=get_manager_data.rows[0].first_name;
        let last_name=get_manager_data.rows[0].last_name;
        let manager_name=last_name+', '+first_name;
        let results=await pool.query("select employee_fullname,nt_id from staff_admin where manager_name=$1",[manager_name]);
        console.log(results.rows);
        return results.rows;
    }catch(error){
        console.log(error);
    }

}