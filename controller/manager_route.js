const express = require("express");
const Json2csvParser = require("json2csv").Parser;
const router = express.Router();
const managermodel = require("../models/manager");
const auth = require("../utils/auth");

router.post("/", async (req, res) => {
  try {
    console.log("Inside the manager route");
    console.log(req.body);
    var arr = [];
    var a = req.body.Employee;
    console.log(Array.isArray(a));
    console.log(a);
    var Startdate = req.body.Start_date;
    var Enddate = req.body.End_date;
    if (Array.isArray(a)) {
      arr.push(...a);
    } else {
      arr.push(a);
    }
    console.log(arr);
    let jsonData = await managermodel.csvfile(arr, Startdate, Enddate);
    const json2csvParser = new Json2csvParser({ header: true });
    console.log("JSON to csv parser");
    const csv = json2csvParser.parse(jsonData);
    res.header("Content-Type", "text/csv");
    res.attachment("employee_report.csv");
    return res.send(csv);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
