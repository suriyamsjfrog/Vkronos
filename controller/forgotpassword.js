const express = require("express");
const router = express.Router();
const checkcred = require("../models/forgotpasswordmodel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

router.get("/page", async (req, res) => {
  try {
    res.render("forgotpass_form1.ejs", { errlog: "" });
  } catch (error) {}
});

router.post("/forgotpassword", async (req, res) => {
  let { email, squestion, sanswer } = req.body;
  console.log("Inside forgot check route");
  console.log(email, sanswer, squestion);
  let count = await checkcred.findandchange(email, squestion, sanswer);

  if (!count) {
    res.render("forgotpass_form1.ejs", { errlog: "Invalid credentials" });
  } else {
    console.log("Generating token");
    let token_reset = await jwt.sign(
      {
        email: email,
      },
      "secret",
      {
        expiresIn: "1h",
      }
    );
    res.cookie("token_reset", token_reset, {
      httpOnly: "true",
      expire: 3600000 + Date.now(),
    });
    res.render("forgotpass2.ejs", { errlog: "" });
  }
});

router.post("/resetpass", async (req, res) => {
  console.log("Insde reset pass");
  let { password, cpassword } = req.body;
  console.log(password, cpassword);
  let token = req.cookies.token_reset;

  console.log(token);
  if (!token) {
    res.render("forgotpass_form1.ejs", { errlog: "Your Token is expired" });
  } else {
    var result = jwt.verify(token, "secret");
    let email = result.email;
    if (password != cpassword) {
      res.render("forgotpass2.ejs", { errlog: "Password missmatch" });
    } else {
      salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      console.log(hash);
      let result = await checkcred.updatepass(email, hash);
      if (!result) {
        console.log("Didnot update");
      } else {
        res.clearCookie("token_reset");
        res.render("signup_signin", {
          error: "Your password is reset",
          errorsign: "",
        });
      }
    }
  }
});

module.exports = router;
