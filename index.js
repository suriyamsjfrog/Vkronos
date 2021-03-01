const express=require("express");
const app=express();
const path=require('path');
const router = require("./public/js/login");
const login=require('./public/js/login');
const signup=require('./public/js/signup');
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
        res.render('index1',{error:"",errorsign:""});
});
app.listen(port,()=>{
    console.log("Conenction established with the required port number");
})