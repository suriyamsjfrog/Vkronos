const express = require("express");
const logincheck = require("../models/logincheck");
const manager = require("../models/manager");
const validCred = require("./validcred");
const jwt = require("jsonwebtoken");
const auth = require("../utils/auth");
const bcrypt = require("bcrypt");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    var shift_times = {
      ANZ: "4:00 AM to 1:00 PM",
      "Asia Pacific": "6:00 AM to 3:00 PM",
      EMEA: "4:00PM to 1:00 AM",
    };

    let { email, password } = req.body;
    console.log(req.header["authorization"]);
    let emailData = await logincheck.findemail(email);
    if (emailData.rowCount === 0) {
      res.render("signup_signin", {
        error: "Invalid Credentials, please register",
      });
      //  res.send("Invalid credential");
    } else {
      const hash = emailData.rows[0].pass;
      console.log("This is the password check");
      console.log(hash);
      console.log(password);
      username = emailData.rows[0].username;
      usertype = emailData.rows[0].usertype;
      const passcheck = await bcrypt.compare(password, hash);
      console.log(passcheck);
      if (!passcheck) {
        res.render("signup_signin", {
          error: "Password Missmatch",
        });
        //   res.send("password error");
      } else {
        var today = new Date();
        let staffdata = await logincheck.findusertype(email);
        console.log(staffdata[0].business_unit);
        var bunit = staffdata[0].business_unit;
        var shift_time = shift_times[staffdata[0].business_unit];
        console.log(shift_time);
        var date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        var logintime =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        today.setHours(today.getHours() + 9);
        var logoutime =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        console.log(date, logintime);
        let insertd = await logincheck.insertdata(
          username,
          email,
          date,
          logintime,
          logoutime
        );
        let dropdownlist = await manager.dropdownlist(email);
        if (!insertd) {
          let find = await logincheck.finddata(date, email);
          if (usertype === "M") {
            res.render("manager_page", {
              username: staffdata[0].employee_fullname,
              dropdownVals: dropdownlist,
            });
          } else {
            res.render("user_profile", {
              username: staffdata[0].employee_fullname,
              logintime: find.rows[0].logintime,
              bunit: bunit,
              shift_time: shift_time,
            });
          }
        } else {
          let token = await jwt.sign(
            {
              email_: email,
              user_name: username,
              login_time: logintime,
              usertype: usertype,
            },
            "secret",
            {
              expiresIn: "10h",
            }
          );
          console.log(token);
          res.cookie("token", token, {
            httpOnly: "true",
            expire: 32400000 + Date.now(),
          });
          //res.cookie('token',token).send('cookie set');
          // req.cookies
          if (usertype === "M") {
            res.render("manager_page", {
              username: staffdata[0].employee_fullname,
              dropdownVals: dropdownlist,
            });
          } else {
            res.render("user_profile", {
              username: staffdata[0].employee_fullname,
              logintime: logintime,
              bunit: bunit,
              shift_time: shift_time,
            });
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
