const express=require("express");
const logincheck=require("../../models/logincheck");
const validCred=require("../../public/js/validcred");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcrypt");
const router=express.Router();


router.post('/',async(req,res)=>{
    try{
        let {email,password}=req.body;
        let emailData=await logincheck.findemail(email);
        if(emailData.rowCount===0) {
           // res.render('signin_signup',{error:"Invalid Credentials, please register",errorsign:""});
           res.send("Invalid credential");
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
                //res.render('signin_signup',{error:"Password Missmatch",errorsign:""})
                res.send("password error");
            }else{
                var today = new Date();
                var date=today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var logintime = today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds();
                var logoutime= today.getHours()+ ":" + today.getMinutes() + ":" + today.getSeconds();
                console.log(date, logintime);
                let insertd=await logincheck.insertdata(username,email,date,logintime,logoutime);
                if(insertd===0){
                    res.send("You can login only once in a day");
                }else{
                    res.send("Successfull login");
                }
                res.send('Hi there');
                let token = await jwt.sign(
                    {  
                        email_:email,
                        user_name: username,
                    },
                    'secret',
                    {
                        expiresIn: '10h'
                    }
                );

               
            }
        }       
    }catch(error){
        console.log(error);
    }
})



module.exports=router;