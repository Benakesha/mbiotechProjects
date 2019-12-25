const config = require("../config.js").getConfig(),
  logger = require("../logger"),
  Visitor = require("../models/visitor"),
  publicIp = require("public-ip");
iplocation = require("iplocation").default;

module.exports = function(app, api) {
  api.post("/visitor", async (req, res) => {
    // var reip =
    //   req.headers["x-forwarded-for"] ||
    //   req.connection.remoteAddress ||
    //   req.socket.remoteAddress ||
    //   (req.connection.socket ? req.connection.socket.remoteAddress : null);
    // reip = reip.split(":").slice(-1)[0];
    // console.log("ip---", reip);
    var ip = await publicIp.v4();
    var latitude;
    var longitude;
    var city;
    var region;
    var postal;
    await iplocation(req.clientIp)
      .then(res => {
        (latitude = res.latitude),
          (longitude = res.longitude),
          (region = res.region),
          (city = res.city);
      })
      .catch(err => {
        console.log("err---", err);
      });
    const visitorData = {
      executiveName: req.body.userData.executiveName,
      fullname: req.body.userData.username,
      email: req.body.userData.email,
      phoneNo: req.body.userData.phoneNo,
      address: req.body.userData.address,
      pincode: req.body.userData.pincode,
      typeOfPlace: JSON.stringify(req.body.userData.role),
      contractorName: req.body.userData.cname,
      contractorPhoneNo: req.body.userData.cphone,
      electricianName: req.body.userData.elname,
      electricianNo: req.body.userData.elno,
      CarpenterName: req.body.userData.carpname,
      CarpenterNo: req.body.userData.carpno,
      PainterName: req.body.userData.pantrname,
      PainterNo: req.body.userData.pantrno,
      PlumberName: req.body.userData.plumname,
      PlumberNo: req.body.userData.plumno,
      InteriorName: req.body.userData.intname,
      InteriorNo: req.body.userData.intno,
      FabricatorName: req.body.userData.fabrname,
      FabricatorNo: req.body.userData.fabrino,

      latitude: latitude,
      longitude: longitude,
      city: city,
      region: region
    };
    Visitor.findUserByName(visitorData, (err, user) => {
      if (err) throw err;
      if (user) {
        return res.json({ success: false, message: "Visitor already exists" });
      } else {
        Visitor.addVisitor(visitorData, (err, data) => {
          if (err) throw err;
          if (data) {
            return res.json({
              success: true,
              message: "Visitor added successfully"
            });
          }
        });
      }
    });
  });
  api.get("/visitorData", (req, res) => {
    Visitor.find({}, (error, result) => {
      if (error) {
        res.json({ success: false, message: error });
      }
      if (result.length > 0) {
        res.json({ success: true, data: result });
      } else {
        res.json({ success: false, message: "No visitors data available" });
      }
    });
  });

  api.put("/visitorDelete", async (req, res) => {
    Visitor.deleteOne({ _id: req.body.id }, function(err) {
      if (!err) {
        res.json({
          success: true,
          message: "Visitor data deleted successfuly"
        });
      } else {
        res.json({ success: false, message: err });
      }
    });
  });
};
