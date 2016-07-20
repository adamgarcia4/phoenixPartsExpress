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

// PartSchema.pre('save', function(next) {
//   var err = new Error('needUniquePartNumber');
//   next(err);
// })

// return the model
module.exports = Part = mongoose.model('Part', PartSchema);

module.exports.createPart = function(newPart) {
//return promise with .then to proceed or .catch to handle errors saving
	return new Promise(function(fulfill, reject) {
		//Query DB for any repeated part
		this.Part.find({'partNumber' : newPart.partNumber}, function(err, docs) {
			if(err && (11000 === err.code || 11001 === err.code)) {
				reject({param: 'nonUniquePart', msg: 'Part Number in DB', value: ''});
			} else if (err) {
				reject(new Error('Some Other DB save Error...'));
			} else {
				newPart.save();
				fulfill(newPart);
			}
		});
	});
};