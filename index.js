const express = require("express");
const app = express();
const login = require("./controller/login");
const signup = require("./controller/signup");
const manager = require("./controller/manager_route");
const dropdown = require("./models/manager");
const auth = require("./utils/auth");
const logout = require("./controller/logout");
const cookieParser = require("cookie-parser");
const logincheck = require("./models/logincheck");
const breakroute = require("./controller/breakroute");
const breakdata = require("./models/break");
const forgotpass1 = require("./controller/forgotpassword");
const port = process.env.PORT || 3000;
app.use(express.static("public"));
app.use(cookieParser());
app.use("/css", express.static(__dirname + "public/css"));
app.use("/js", express.static(__dirname + "public/js"));
app.use("/img", express.static(__dirname + "public/img"));
app.use("/views", express.static(__dirname + "views"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: "false",
  })
);
app.use("/login", login);
app.use("/signup", signup);
app.use("/logout", logout);
app.use("/manager", manager);
app.use("/break", breakroute);
app.use("/forgot", forgotpass1);
console.log("test");
//app.set('views','./views')
app.set("views", "./views");
app.set("view engine", "ejs");
app.get("/", async (req, res) => {
  var shift_times = {
    ANZ: "4:00 AM to 1:00 PM IST",
    "Asia Pacific": "6:00 AM to 3:00 PM IST",
    EMEA: "4:00PM to 1:00 AM",
    SEAK: "6:00 AM to 3:00 PM IST"
  };
  console.log("This is it");
  console.log(req.cookies);
  let s = await auth(req, res);
  console.log("Response after auth is", s);
  if (s === 1) {
    let staffdata = await logincheck.findusertype(req.body.email_);
    console.log(staffdata[0].business_unit);
    var bunit = staffdata[0].business_unit;
    let bdata = await breakdata.findbreak(
      req.body.currentdate,
      req.body.email_
    );
    var shift_time = shift_times[staffdata[0].business_unit];
    let dropdownlist = await dropdown.dropdownlist(req.body.email_);
    console.log(shift_time);
    if (req.body.usertype === "M") {
      res.render("manager_page", {
        username: staffdata[0].employee_fullname,
        dropdownVals: dropdownlist,
      });
    } else {
      res.render("user_profile", {
        username: staffdata[0].employee_fullname,
        logintime: req.body.login_time,
        bunit: bunit,
        shift_time: shift_time,
        breaktime: bdata[0].break,
      });
    }
  } else {
    console.log("Hi there, this is a test devxbcjhelopment test fbdhbcor");
    res.render("signup_sign", {
      error: ""
    });
  }
});
app.listen(port, () => {
  console.log("Conenction established testing 1");
});
