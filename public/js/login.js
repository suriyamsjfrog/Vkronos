const express=require("express");
const logincheck=require("../../models/logincheck")
const validCred=require("../../public/js/validcred");
const router=express.Router();


router.post('/',async(req,res)=>{
    try{
        let {email,password}=req.body;
        let cpassword=password;
        const isValidated=validCred(email,password,cpassword);
       // console.log(isValidated);
       
        console.log(isValidated.status);
		if (!isValidated.status) {
            let message=isValidated.errors[0].message;
			return res.render('index1',{error:message,errorsign:""});
		}else{
            res.send("Hi There");
        }
    }catch(error){
        console.log(error);
    }
})



module.exports=router;