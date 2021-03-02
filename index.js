const express=require("express");
const app=express();
const path=require('path');
const router = require("./public/js/login");
const login=require('./public/js/login');
const signup=require('./public/js/signup');
const auth=require('./utils/auth');
const port=process.env.PORT || 3000;
app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/img',express.static(__dirname+'public/img'))
app.use(express.json());
app.use(express.urlencoded({
    extended:"false",
}));
app.use('/login',login);
app.use('/signup',signup);

//app.set('views','./views')
app.set('views','./views');
app.set('view engine','ejs')
app.get("/",(req,res)=>{
        let val=auth();
        if(val===1){
            req.render('logout',{username:req.body.user_name,logintime:req.body.login_time})
        }else{
            res.render('signup_signin',{error:"",errorsign:""});
        }
});
app.listen(port,()=>{
    console.log("Conenction established with the required port number");
})