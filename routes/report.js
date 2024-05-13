const express = require("express");
const { Report } = require("../models/report");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    let report = await Report.aggregate([{ $sort: { quoteCount: 1 } }]);
    report.map((val, idx) => {
      val.lowerQuoteCount = report[idx - 1] ? report[idx - 1].quoteCount : "-";
      val.higherQuoteCount = report[idx + 1] ? report[idx + 1].quoteCount : "-";
    });
    if (req.query.sort == "name" || req.query.sort == "email") {
      let sortBy = req.query.sort;
      report.sort((a, b) => {
        const A = a[sortBy].toUpperCase();
        const B = b[sortBy].toUpperCase();

        if (A < B) {
          return -1;
        }
        if (A > B) {
          return 1;
        }
        return 0;
      });
    }
    return res.status(200).send(report);
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

router.post("/addReport", async (req, res) => {
  try {
    let newReport = await new Report({
      name: req.body.name,
      email: req.body.email,
      quoteCount: req.body.quoteCount,
    }).save();
    res.status(200).send({ reportDetails: newReport });
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});
const reportRoutes = router;
module.exports = { reportRoutes };
