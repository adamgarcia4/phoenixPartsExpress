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


module.exports.createPart = function(newPart) {
//return promise with .then if save successful or .catch to handle errors saving
	return new Promise(function(fulfill, reject) {
		//Query DB for any repeated part
		checkUniquePartNum(newPart, newPart.partNumber)
			.then(function(newPart) {
				newPart.save();
				fulfill(newPart);
			}, function(errMessage) {
				reject(errMessage);
			});
	});
};

module.exports.getPartById = function(partReq) {
	return new Promise(function(fulfill, reject) {
		this.Part.find({'partNumber' : partReq}, function(err, docs) {
			if(docs && docs.length==1) {
				console.log('docs is: ' + docs);
				fulfill(docs);
			} else if (!docs) {
				reject([{param: "noPartFound", msg:  "Part Number : '" + partReq.partNumber + "' Not Found", value: ""}]);
			} else {
				reject([{param: "multiplePartsFound", msg:  "Part Number : '" + partReq.partNumber + "' Found '" + docs.length + "'' Times", value: ""}]);
			}
		});
	});
};

//Uniqueness Error Handling for Part Number | Implemented as a promise
checkUniquePartNum = function(newPart, partNum) {
	return new Promise(function(fulfill, reject) {
		this.Part.find({'partNumber' : partNum}, function(err, docs) {
			
			//if Query returns empty, then no uniqueness conflicts, so save part
			if(docs.length == 0) {
				fulfill(newPart);
			} else {
				//found a matching partNumber in Database, so render error
				reject([{param: "nonUniquePart", msg:  "Part Number : '" + partNum + "' Already Taken", value: ""}]);
			}
		});
	});
};