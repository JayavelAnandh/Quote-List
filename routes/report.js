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
    } else if (req.query.search) {
      let query = req.query.search;
      report = report.filter((val) => {
        return (
          val.email.toUpperCase().includes(query.toUpperCase()) ||
          val.name.toUpperCase().includes(query.toUpperCase())
        );
      });
    }
    return res.status(200).send({ status: "SUCCESS", reportDetails: report });
  } catch (error) {
    res.status(500).send({ status: "FAILED", message: error.message });
  }
});

router.post("/addReport", async (req, res) => {
  try {
    let newReport = await new Report({
      name: req.body.name,
      email: req.body.email,
      quoteCount: req.body.quoteCount,
    }).save();
    res.status(201).send({ reportDetails: newReport, status: "SUCCESS" });
  } catch (error) {
    res.status(500).send({ status: "FAILED", message: error.message });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const idToDelete = req.params.id;
    const response = await Report.findByIdAndDelete({ _id: idToDelete });
    res
      .status(200)
      .send({ message: "Report removes successfully", status: "SUCCESS" });
  } catch (error) {
    res.status(500).send({ status: "FAILED", message: error.message });
  }
});

router.get("/email/:mailId", async (req, res) => {
  try {
    const response = await Report.findOne({ email: req.params.mailId });
    if (response) {
      return res.status(200).send({ message: "Available", status: "SUCCESS" });
    }
    res.status(200).send({ message: "NotAvailable", status: "SUCCESS" });
  } catch (error) {
    res.status(500).send({ status: "FAILED", message: error.message });
  }
});
const reportRoutes = router;
module.exports = { reportRoutes };
