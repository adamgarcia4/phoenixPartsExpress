// Parts.js--Route Handler

//********Import Dependencies************

var express = require('express');
var router = express.Router();

// Model Dependency
var Part = require("../models/Part.js");


//**************Routes*****************

//***CRUD [R] Operation - Parts Listing***
/* GET parts listing. */
router.get('/', function(req, res, next) {

	Part.getParts().then(
		function(parts) {
			console.log('Getting parts Listing');
			res.render('./parts/index', {
				locals: {
					partsList : parts
				}
			});
		},
		function(error) {
			res.render('./parts/index', {
				errors: error
			});
		}
	);
});

//***CRUD [C] Operation - Create Part
router.get('/create', function(req, res, next) {
	res.render('./parts/create');
});

router.post('/create', function(req, res, next) {

	//*****Capture Part Info******
	var partNumber = req.body.partNumber;
	var partProjectId = req.body.projectId;
	var partType = req.body.partType;
	var partName = req.body.partName;
	var partNotes = req.body.notes;
	var status = req.body.status;
	var partQuantity = req.body.quantity;

	//Validate using checkBody (from body-parser middleware)
	req.checkBody('partNumber', 'Part Number is required').notEmpty();
	req.checkBody('partType', 'Part Type is required').notEmpty();
	req.checkBody('partName', 'Part Name is required').notEmpty();
	req.checkBody('status', 'Part Status is required').notEmpty();
	//req.checkBody('partQuantity', 'Quantity is required').notEmpty();

	var validationErrors = req.validationErrors();
	console.log(validationErrors);

	//******If Form Valid, post part**********
	if(validationErrors) {
		res.render('./parts/create', {
			errors: validationErrors
		});
	} else {
		var newPart = Part();
		newPart.partNumber = partNumber;
		newPart.projectId = partProjectId;
		newPart.partType = partType;
		newPart.partName = partName;
		newPart.notes = partNotes;
		newPart.status = status;
		newPart.quantity = partQuantity;

		//Call Model's create Part functionality
		Part.createPart(newPart).then(
			function(newPart) {
				console.log('Create Part Success', newPart);
				req.flash('success_msg', 'You have successfully created your part!');
				res.redirect('/parts/');
			},
			function(error) {
				console.log('Create Part Failure', error);
				//TODO: Error persists on refresh after rendering out error
				
				res.render('./parts/create', {
					errors: error
				});
			}
		);
	}
});

// //***CRUD [C] Operation - Create Part
// router.post('/update', function(req, res, next) {
// 	console.log('UPDATE PART');
// 	console.log(req.body.partType);
// 	//*****Capture Part Info******
// 	var partNumber = req.body.partNumber;
// 	var partProjectId = req.body.projectId;
// 	var partType = req.body.partType;
// 	var partName = req.body.partName;
// 	var partNotes = req.body.notes;
// 	var status = req.body.status;
// 	var partQuantity = req.body.quantity;

// 	//Validate using checkBody (from body-parser middleware)
// 	req.checkBody('partNumber', 'Part Number is required').notEmpty();
// 	req.checkBody('partType', 'Part Type is required').notEmpty();
// 	req.checkBody('partName', 'Part Name is required').notEmpty();
// 	req.checkBody('status', 'Part Status is required').notEmpty();
// 	//req.checkBody('partQuantity', 'Quantity is required').notEmpty();

// 	var validationErrors = req.validationErrors();
// 	console.log(validationErrors);
// 	//******If Form Valid, post part**********
// 	if(validationErrors) {
// 		res.render('./parts/create', {
// 			errors: validationErrors
// 		});
// 	} else {
// 		var newPart = Part();
// 		newPart.partNumber = partNumber;
// 		newPart.projectId = partProjectId;
// 		newPart.partType = partType;
// 		newPart.partName = partName;
// 		newPart.notes = partNotes;
// 		newPart.status = status;
// 		newPart.quantity = partQuantity;

// 		//save schema to db
		

// 		Part.createPart(newPart).then(
// 			function(newPart) {
// 				console.log('Create Part Success', newPart);
// 				req.flash('success_msg', 'You have successfully created your part!');
// 				res.redirect('/parts/');
// 			},
// 			function(error) {
// 				console.log('Create Part Failure', error);
// 				//TODO: Error persists on refresh after rendering out error
// 				res.render('./parts/create', {
// 					errors: error
// 				});
// 			}
// 		);
// 	}
// });




//***CRUD [U] - Edit By ID**********************
router.get('/:id/edit', function(req, res, next) {
	
	var candidateId = req.params.id;

	Part.getPartById(candidateId).then(
		function(newPart) {
			newPart = newPart[0]; //returns as an obj in arr
			res.render('./parts/edit',{
				locals: {
					partNum : newPart.partNumber,
					retrPart : newPart
				}
			});
		},
		function(error) {
			console.log('Error is: ' + error);
			req.flash('error_msg', "Part Number : '" + candidateId + "' Does Not Exist");
			res.redirect('/parts');
		}
	);
});

module.exports = router;