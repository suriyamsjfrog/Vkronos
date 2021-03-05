const express=require("express");
const router=express.Router();
const managermodel=require('../../models/manager');
const auth=require('../../utils/auth');

router.post('/',async (req,res)=>{
    try{

            console.log("Inside the manager route");
            console.log(req.body);
            var arr=[];
            var a=req.body.Employee;
            var Startdate=req.body.Start_date;
            var Enddate=req.body.End_date;
            arr.push(a);
            console.log(arr);
           await  managermodel.csvfile(arr,Startdate,Enddate);
            res.send("Hi manager");
            
    }catch(error){
        console.log(error);
    }
})

module.exports=router;
