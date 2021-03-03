const express=require("express");
const logincheck=require("../../models/logincheck");
const validCred=require("../../public/js/validcred");
const jwt=require("jsonwebtoken");
const auth=require("../../utils/auth");
const bcrypt=require("bcrypt");
const router=express.Router();


router.post('/',async(req,res)=>{
    try{
       
        let {email,password}=req.body;
        console.log(req.header['authorization']);
        let emailData=await logincheck.findemail(email);
        if(emailData.rowCount===0) {
            res.render('signup_signin',{error:"Invalid Credentials, please register",errorsign:""});
         //  res.send("Invalid credential");
        }
        else{
            const hash=emailData.rows[0].pass;
            console.log("This is the password check");
            console.log(hash);
            console.log(password);
            username= emailData.rows[0].username;
            const passcheck=await bcrypt.compare(password,hash);
            console.log(passcheck);
            if(!passcheck){
                res.render('signup_signin',{error:"Password Missmatch",errorsign:""})
             //   res.send("password error");
            }else{
                var today = new Date();
                var date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var logintime = today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds();
                var logoutime= today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log(date, logintime);
                let insertd=await logincheck.insertdata(username,email,date,logintime,logoutime);
                if(!insertd){
                    let find=await logincheck.finddata(date,email);
                    res.send( res.render('logout',{username:find.rows[0].username,logintime:find.rows[0].logintime}));
                }else{
                    let token = await jwt.sign(
                        {  
                            email_:email,
                            user_name: username,
                            login_time:logintime
                        },
                        'secret',
                        {
                            expiresIn: '10h'
                        }
                    );
                    console.log(token);
                   res.cookie('token',token,{
                        httpOnly:'true',
                        expire: 32400000 + Date.now()
                    });
                    //res.cookie('token',token).send('cookie set');
                   // req.cookies
                    res.render('logout',{username:username,logintime:logintime});
                }
               

               
            }
        }       
    }catch(error){
        console.log(error);
    }
})



module.exports=router;