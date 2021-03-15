const express = require("express");
const router = express.Router();
const breakhrs = require("../models/break");
const auth = require("../utils/auth");

router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    let s = await auth(req, res);
    if (s == 1) {
      var date = req.body.currentdate;
      let break1 = req.body.break;
      let break_hr = "00:" + break1;
      let username = req.body.user_name;
      let result = await breakhrs.breakupdate(date, break_hr, username);
      res.redirect("../../");
    } else {
      res.redirect("../../");
    }
  } catch (error) {}
});

module.exports = router;
