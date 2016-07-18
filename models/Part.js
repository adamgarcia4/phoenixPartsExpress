// Part Model

//Dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//Part Schema
var PartSchema = new Schema({
    partNumber: {
      type: Number,
      required: true,
      unique: true
    },
    projectId: {
      type: Number
    },
    partType: {
      type: String,
      required: true
    },
    partName : {
      type: String,
      required: true
    },
    notes: {
      type: String
    },
    status: {
      type: String,
      required: true
    },
    quantity: {
      type: String
    }
});

// return the model
module.exports = Part = mongoose.model('Part', PartSchema);

module.exports.createPart = function(newUser, callback) {
  //TODO check for uniqueness
  newUser.save(callback);
}