const express=require("express");
const bcrypt=require("bcrypt");
const router=express.Router();
const validCred=require('../../public/js/validcred');
const signup=require('../../models/signup');
router.post('/',async(req,res)=>{
    try{
        let {username,password,cpassword,email}=req.body;
        const isValidated=validCred(email,password,cpassword);
        if (!isValidated.status) {
            let message=isValidated.errors[0].message;
			return res.render('index1',{error:"",errorsign:message});
		}
        let emailData=await signup.findemail(email);
        if(emailData.rowCount != 0){
            return res.render('index1',{error:"Email exists",errorsign:"Email exists"});
        }else{
            //salt=await bcrypt.genSalt(10);
            return res.send("Hi there");

        }

    }catch(error){
        console.log(error);
    }
})

module.exports=router;