const express = require("express");
const router = express.Router();
const updatelogout = require("../models/logout");
const auth = require("../utils/auth");
router.post("/", async (req, res) => {
  try {
    let s = await auth(req, res);
    var today = new Date();
    let email = req.body.email_;
    var date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    var logoutime =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let updatecount = await updatelogout.insertlogoutdata(
      email,
      logoutime,
      date
    );
    if (!updatecount) {
      console.log("The person have already loggedout");
    } else {
      console.log("Your logout time is registeres successfully");
    }
    res.clearCookie("token");
    res.render("signup_signin", { error: "", errorsign: "" });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
