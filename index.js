const express=require("express");
const app=express();
const path=require('path');
const router = require("./public/js/login");
const login=require('./public/js/login');
const signup=require('./public/js/signup');
const auth=require('./utils/auth');
const logout=require('./public/js/logout');
const cookieParser=require('cookie-parser');
const logincheck=require('./models/logincheck');
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
    var shift_times={
        'ANZ':'4:00 AM to 1:00 PM',
        'Asia Pacific':'6:00 AM to 3:00 PM',
        'EMEA':'4:00PM to 1:00 AM'
    }
    console.log('This is it');
    console.log(req.cookies);
    let s=await auth(req,res);
    console.log('Response after auth is',s);
    if(s===1){
        let staffdata=await logincheck.findusertype(req.body.email_);
        console.log(staffdata[0].business_unit);
        var bunit=staffdata[0].business_unit;
        var shift_time=shift_times[staffdata[0].business_unit];
        console.log(shift_time);
        res.render('user_profile',{username:req.body.user_name,logintime:req.body.login_time,bunit:bunit,shift_time:shift_time});
    }else{
        res.render('signup_signin',{error:"",errorsign:""});
    }
});
app.listen(port,()=>{
    console.log("Conenction established with the required port number");
})