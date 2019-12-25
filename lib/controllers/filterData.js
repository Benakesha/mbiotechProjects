const path = require("path");
const Visitor = require("../models/visitor");

module.exports = function(app, api) {
  api.post("/filterData", (req, res) => {
    console.log("filter---", req.body);
    let username = req.body.filterData.username;
    let fromDate = new Date(req.body.filterData.fromDate);
    let toDate = new Date(req.body.filterData.toDate);
    fromDate = new Date(
      fromDate.getTime() + Math.abs(fromDate.getTimezoneOffset() * 60000)
    );
    toDate = new Date(
      toDate.getTime() + Math.abs(toDate.getTimezoneOffset() * 60000)
    );

    Visitor.find(
      {
        executiveName: username,
        $or: [{ timestamp: { $gte: fromDate, $lte: toDate } }]
      },
      function(err, data) {
        if (err) throw err;
        if (data.length > 0) {
          res.json({ success: true, data: data });
        } else {
          res.json({
            success: false,
            message: "No records found in the given date range for user"
          });
        }
      }
    );
  });
};
