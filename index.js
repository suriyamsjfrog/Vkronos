const express=require("express");
const app=express();
const path=require('path');
const router = require("./public/js/login");
const login=require('./public/js/login');
const signup=require('./public/js/signup');
const auth=require('./utils/auth');
const logout=require('./public/js/logout');
const cookieParser=require('cookie-parser');
const port=process.env.PORT || 3000;
app.use(express.static('public'))
app.use(cookieParser());
app.use('/css',express.static(__dirname+'public/css'))
app.use('/js',express.static(__dirname+'public/js'))
app.use('/img',express.static(__dirname+'public/img'))
app.use(express.json());
app.use(express.urlencoded({
    extended:"false",
}));
app.use('/login',login);
app.use('/signup',signup);
app.use('/logout',logout);

//app.set('views','./views')
app.set('views','./views');
app.set('view engine','ejs')
app.get("/",async (req,res)=>{
    console.log('This is it');
    console.log(req.cookies);
    let s=await auth(req,res);
    console.log('Response after auth is',s);
    if(s===1){
        
        res.render('logout',{username:req.body.user_name,logintime:req.body.login_time});
    }else{
        res.render('signup_signin',{error:"",errorsign:""});
    }
});
app.listen(port,()=>{
    console.log("Conenction established with the required port number");
})