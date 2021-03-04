const express=require("express");
const router=express.Router();
const managermodel=require('../../models/manager');
const auth=require('../../utils/auth');

router.post('/',async (req,res)=>{
    try{

            console.log("Inside the manager route");
            console.log(req.body);
            res.send("Hi manager");
    }catch(error){
        console.log(error);
    }
})

module.exports=router;
