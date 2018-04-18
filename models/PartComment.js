'use strict';

//http://mongoosejs.com/docs/schematypes.html

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PartCommentSchema = new Schema({
	partId: {
		type: String,
		// required: 'Pleaase enter Parent Part ID'
	},
	parentId: {
		type: Schema.Types.ObjectId
	},
	slug: {
		type: String
	},
	body: {
		type: String,
		required: 'Please enter Text Body',
		default: 'This is a default Comment message'
	},
	date: {
		type: Date,
		default: Date.now
	},
	children: {
		type: [String],
		default: []
	},
	author: {
		name: {
			type: String,
			// required: 'User Name Required',
			default: 'Mr. Baba'
		},
		imgUrl: {
			type: String,
			default: 'www.google.com'
		}
	}
});

PartCommentSchema.post('init', function (doc) {
	console.log('%s has been initialized from the db', doc._id);
});

PartCommentSchema.pre('validate', function (next) {
	// console.log('this gets printed first');
	next()
});

PartCommentSchema.post('validate', function (doc) {
	// console.log('this gets printed second');
	// console.log(doc);
	doc.slug = generateSlug()
});

PartCommentSchema.pre('save', function (next) {
	// console.log('this gets printed third');
	next()
});

PartCommentSchema.post('save', function (doc) {
	// console.log('this gets printed fourth');
	// console.log('%s has been saved', doc);
});

PartCommentSchema.post('remove', function (doc) {
	// console.log('%s has been removed', doc._id);
});


// PartCommentSchema.pre('save', function(next) {
// 	console.log('presave hit');
// 	console.log(this);
// 	console.log('end of presave')
// 	next()
// // });
// }
function generateSlug() {
	var uuid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	return uuid.slice(0, 6);
}
module.exports = mongoose.model('PartComment', PartCommentSchema);

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