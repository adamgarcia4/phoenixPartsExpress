// Parts.js--Route Handler

//********Import Dependencies************

var express = require('express');
var router = express.Router();

// Model Dependency
var Part = require("../models/Part.js");


//**************Routes*****************

/* GET parts listing. */
router.get('/', function(req, res, next) {

	Part.find(function(err, parts) {

		res.render('./parts/index', {
			locals: {
				test : 'hi',
				partsList : parts

			}
		});
	});
});


//**************Create**********************
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

		//save schema to db
		

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


//****************READ**********************
router.get('/:id', function(req, res, next) {
	res.send("ID Number is : " + req.params.id);
})



module.exports = router;
