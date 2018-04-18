'use strict';

//http://mongoosejs.com/docs/schematypes.html

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// var PartCommentSchema = new Schema({
// 	name: {
// 		type: String,
// 		required: 'User name',
// 		default: 'Mr. B'
// 	},
// 	body: {
// 		type: String,
// 		required: 'Please enter Text Body',
// 		default: 'This is a default Comment message'
// 	},
// 	date: {
// 		type: Date,
// 		default: Date.now
// 	},
// 	imgUrl: {
// 		type: String,
// 		default: 'www.google.com'
// 	},
// 	children: {
// 		type: [PartCommentSchema],
// 		default: []
// 	}
// });

var PartSchema = new Schema({
	name: {
		type: String,
		required: 'Please enter a part name',
		default: 'Drive Shaft'
	},
	number: {
		type: String,
		default: '4-2018-01-101'
	},
	quantity: {
		type: Number,
		default: 2
	},
	stockMaterial: {
		type: String,
		default: '6061-T6'
	},
	cutLg: {
		type: String,
		default: '2 in'
	},
	status: {
		type: String,
		default: 'In Progress'
	},
	drawnBy: {
		type: String,
		default: 'Adam'
	},
	machinesNeeded: {
		type: [String],
		default: ['BandSaw', 'CNC Mill', 'CNC Lathe']
	},
	stockOrdered: {
		type: Boolean,
		default: false
	},
	partLocation: {
		type: String,
		default: 'B12'
	},
	assemblyId: {
		type: String,
		default: '01'
	},
	priority: {
		type: Number,
		default: 3
	},
	pictureURL: {
		type: String,
		default: 'www.google.com'
	},
	comments: {
		type: [String] // Needs to be an array of valid comments
	},
	createdDate: {
		type: Date,
		default: Date.now
	}
	// status: {
	// 	type: [{
	// 		type: String,
	// 		enum: ['pending', 'ongoing', 'completed']
	// 	}],
	// 	default: ['pending']
	// }
});

module.exports = mongoose.model('Parts', PartSchema);

// id: number;
// name: string;
// number: string;
// partsPerRobot?: number;
// quantity?: number;
// stockMaterial?: string;
// cutLg?: string;
// status?: string;
// drawnBy?: string;
// machinesNeeded?: machineNeededEntry[];
// stockOrdered?: string;
// partLocation?: string;
// assemblyId: number;
// priority: number;
// pictureURL?: string;
// comments?: PartComment[];

// var schema = new Schema({
// 	name:    String,
// 	binary:  Buffer,
// 	living:  Boolean,
// 	updated: { type: Date, default: Date.now },
// 	age:     { type: Number, min: 18, max: 65 },
// 	mixed:   Schema.Types.Mixed,
// 	_someId: Schema.Types.ObjectId,
// 	decimal: Schema.Types.Decimal128,
// 	array:      [],
// 	ofString:   [String],
// 	ofNumber:   [Number],
// 	ofDates:    [Date],
// 	ofBuffer:   [Buffer],
// 	ofBoolean:  [Boolean],
// 	ofMixed:    [Schema.Types.Mixed],
// 	ofObjectId: [Schema.Types.ObjectId],
// 	ofArrays:   [[]],
// 	ofArrayOfNumbers: [[Number]],
// 	nested: {
// 		stuff: { type: String, lowercase: true, trim: true }
// 	}
// })
//
// required: boolean or function, if true adds a required validator for this property
// default: Any or function, sets a default value for the path. If the value is a function, the return value of the function is used as the default.
// select: boolean, specifies default projections for queries
// 	validate: function, adds a validator function for this property
// get: function, defines a custom getter for this property using Object.defineProperty().
// 	set: function, defines a custom setter for this property using Object.defineProperty().
// 	alias: string, mongoose >= 4.10.0 only. Defines a virtual with the given name that gets/sets this path.