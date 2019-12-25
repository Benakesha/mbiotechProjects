const config = require("../config.js").getConfig(),
  logger = require("../logger"),
  jwt = require("jsonwebtoken"),
  Visitor = require("../models/visitor"),
  User = require("../models/user"),
  Excel = require("exceljs"),
  path = require("path");

module.exports = function(app, api) {
  api.get("/exportData", (req, res) => {
    Visitor.find({}, (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Mbiot Visitor");
        worksheet.properties.outlineLevelRow = 1;
        worksheet.properties.outlineProperties = {
          summaryBelow: false,
          summaryRight: false
        };

        worksheet.columns = [
          { header: "Executive Name", key: "executiveName", width: 22 },
          { header: "Fullname", key: "fullname", width: 22 },
          { header: "Email", key: "email", width: 20 },
          { header: "Address", key: "address", width: 20 },
          { header: "Phone", key: "phoneNo", width: 20 },
          { header: "Type of place", key: "typeOfPlace", width: 20 },
          { header: "Contractor Name", key: "contractorName", width: 20 },
          { header: "ContractorPhoneNo", key: "contractorPhoneNo", width: 20 },

          { header: "Electrician Name", key: "electricianName", width: 20 },
          { header: "Electrician No", key: "electricianNo", width: 20 },
          { header: "Carpenter Name", key: "carpenterName", width: 20 },
          { header: "Carpenter No", key: "carpenterNo", width: 20 },
          { header: "Painter Name", key: "painterName", width: 20 },
          { header: "Painter No", key: "painterNo", width: 20 },
          { header: "Plumber Name", key: "plumberName", width: 20 },
          { header: "Plumber No", key: "plumberNo", width: 20 },
          { header: "Interior Name", key: "interiorName", width: 20 },
          { header: "Interior No", key: "interiorNo", width: 20 },
          { header: "Fabricator Name", key: "fabricatorName", width: 20 },
          { header: "Fabricator No", key: "fabricatorNo", width: 20 },

          { header: "Latitude", key: "latitude", width: 20 },
          { header: "Longitude", key: "longitude", width: 20 },
          { header: "City", key: "city", width: 20 },
          { header: "Timestamp", key: "timestamp", width: 20 }
        ];
        data.forEach((data, index) => {
          worksheet.addRow([
            data.executiveName,
            data.fullname,
            data.email,
            data.address,
            data.phoneNo,
            data.typeOfPlace,
            data.contractorName,
            data.contractorPhoneNo,

            data.electricianName,
            data.electricianNo,
            data.CarpenterName,
            data.CarpenterNo,
            data.PainterName,
            data.PainterNo,
            data.PlumberName,
            data.PlumberNo,
            data.InteriorName,
            data.InteriorNo,
            data.FabricatorName,
            data.FabricatorNo,

            data.latitude,
            data.longitude,
            data.city,
            data.timestamp
          ]);
        });
        var filePath = path.join(__dirname, "../../excel_sheets/fb.xlsx");
        workbook.xlsx.writeFile(filePath).then(function(err) {
          if (err) throw err;
          res.sendFile(filePath, function(err) {
            if (err) throw err;
          });
        });
      }
    });
  });
  api.get("/exportUserData", (req, res) => {
    User.find({}, (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        const workbook = new Excel.Workbook();
        const worksheet = workbook.addWorksheet("Mbiot User");
        worksheet.properties.outlineLevelRow = 1;
        worksheet.properties.outlineProperties = {
          summaryBelow: false,
          summaryRight: false
        };

        worksheet.columns = [
          { header: "Fullname", key: "fullname", width: 22 },
          { header: "Email", key: "email", width: 20 },
          { header: "Address", key: "address", width: 20 },
          { header: "Phone", key: "phoneNo", width: 20 },
          { header: "Zipcode", key: "zipcode", width: 20 },
          { header: "User Type", key: "role", width: 20 }
        ];
        data.forEach((data, index) => {
          worksheet.addRow([
            data.username,
            data.email,
            data.address,
            data.phoneNo,
            data.pincode,
            data.role
          ]);
        });
        var filePath = path.join(__dirname, "../../excel_sheets/fb.xlsx");
        workbook.xlsx.writeFile(filePath).then(function(err) {
          if (err) throw err;
          res.sendFile(filePath, function(err) {
            if (err) throw err;
          });
        });
      }
    });
  });

  api.post("/exportSiteDetails", (req, res) => {
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
      (err, data) => {
        if (err) throw err;
        if (data.length > 0) {
          const workbook = new Excel.Workbook();
          const worksheet = workbook.addWorksheet("Mbiot Visitor");
          worksheet.properties.outlineLevelRow = 1;
          worksheet.properties.outlineProperties = {
            summaryBelow: false,
            summaryRight: false
          };

          worksheet.columns = [
            { header: "Executive Name", key: "executiveName", width: 22 },
            { header: "Fullname", key: "fullname", width: 22 },
            { header: "Email", key: "email", width: 20 },
            { header: "Address", key: "address", width: 20 },
            { header: "Phone", key: "phoneNo", width: 20 },
            { header: "Type of place", key: "typeOfPlace", width: 20 },
            { header: "Contractor Name", key: "contractorName", width: 20 },
            {
              header: "ContractorPhoneNo",
              key: "contractorPhoneNo",
              width: 20
            },

            { header: "Electrician Name", key: "electricianName", width: 20 },
            { header: "Electrician No", key: "electricianNo", width: 20 },
            { header: "Carpenter Name", key: "carpenterName", width: 20 },
            { header: "Carpenter No", key: "carpenterNo", width: 20 },
            { header: "Painter Name", key: "painterName", width: 20 },
            { header: "Painter No", key: "painterNo", width: 20 },
            { header: "Plumber Name", key: "plumberName", width: 20 },
            { header: "Plumber No", key: "plumberNo", width: 20 },
            { header: "Interior Name", key: "interiorName", width: 20 },
            { header: "Interior No", key: "interiorNo", width: 20 },
            { header: "Fabricator Name", key: "fabricatorName", width: 20 },
            { header: "Fabricator No", key: "fabricatorNo", width: 20 },

            { header: "Latitude", key: "latitude", width: 20 },
            { header: "Longitude", key: "longitude", width: 20 },
            { header: "City", key: "city", width: 20 },
            { header: "Timestamp", key: "timestamp", width: 20 }
          ];
          data.forEach((data, index) => {
            worksheet.addRow([
              data.executiveName,
              data.fullname,
              data.email,
              data.address,
              data.phoneNo,
              data.typeOfPlace,
              data.contractorName,
              data.contractorPhoneNo,

              data.electricianName,
              data.electricianNo,
              data.CarpenterName,
              data.CarpenterNo,
              data.PainterName,
              data.PainterNo,
              data.PlumberName,
              data.PlumberNo,
              data.InteriorName,
              data.InteriorNo,
              data.FabricatorName,
              data.FabricatorNo,

              data.latitude,
              data.longitude,
              data.city,
              data.timestamp
            ]);
          });
          var filePath = path.join(__dirname, "../../excel_sheets/fb.xlsx");
          workbook.xlsx.writeFile(filePath).then(function(err) {
            if (err) throw err;
            res.sendFile(filePath, function(err) {
              if (err) throw err;
            });
          });
        }
      }
    );
  });
};
