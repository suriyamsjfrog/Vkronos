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


module.exports.csvfile=async(arr,startdate,enddate)=>{
    console.log('Inside csv route');
    var params = [];
    console.log(arr);
    for(var i = 1; i <= arr.length; i++) {
    params.push('$' + i);
    }
    let j='$'+(arr.length+1);
    let k='$'+(arr.length+2);
    arr.push(startdate);
    arr.push(enddate);
    var queryText = 'SELECT s.business_unit,s.working_day,s.employee_fullname,l.username,l.email,s.role_type,s.role_group,l.currentdate,l.logintime,l.logouttime FROM logintime as l,staff_admin as s WHERE l.email=s.email_address and l.username IN (' + params.join(',') + ')'+'and currentdate between '+ j+' and '+k+' order by l.username,l.currentdate';
    console.log(queryText);
    let result=await pool.query(queryText,arr);
   // console.log(result.rows);
    jsonData=JSON.parse(JSON.stringify(result.rows));
    console.log(jsonData);
    return jsonData ;
}