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
            res.render('signin_signup',{error:"Invalid Credentials please register",errorsign:""});
        }
        else{
            const hash=emailData.rows[0].pass;
            const passcheck=await bcrypt.compare(password,hash);
            if(!passcheck){
                res.render('signin_signup',{error:"Password Missmatch",errorsign:""})
            }else{
                let token = await jwt.sign(
                    {
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