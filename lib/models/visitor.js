var mongoose = require("mongoose");

const newVisitor = mongoose.Schema({
  executiveName: {
    type: String
  },
  fullname: {
    type: String,
    require: true
  },
  email: {
    type: String
  },
  phoneNo: {
    type: String,
    require: true
  },
  address: {
    type: String,
    require: true
  },
  pincode: {
    type: String,
    require: true
  },
  typeOfPlace: {
    type: String,
    require: true
  },
  contractorName: {
    type: String
  },
  contractorPhoneNo: {
    type: String
  },
  electricianName: {
    type: String
  },
  electricianNo: {
    type: String
  },
  CarpenterName: {
    type: String
  },
  CarpenterNo: {
    type: String
  },
  PainterName: {
    type: String
  },
  PainterNo: {
    type: String
  },
  PlumberName: {
    type: String
  },
  PlumberNo: {
    type: String
  },
  InteriorName: {
    type: String
  },
  InteriorNo: {
    type: String
  },
  FabricatorName: {
    type: String
  },
  FabricatorNo: {
    type: String
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  latitude: {
    type: String
  },
  longitude: {
    type: String
  },
  city: {
    type: String
  },
  region: { type: String }
});

var Visitor = (module.exports = mongoose.model("Visitor", newVisitor));
module.exports.findUserByName = function(visitor, callback) {
  Visitor.findOne({ email: visitor.email }, callback);
};

module.exports.addVisitor = function(newVisitor, callback) {
  let visitor = new Visitor(newVisitor);
  visitor.save(callback);
};
