'use strict';
module.exports = function(app) {
	var partsController = require('../controllers/partsController');

	// todoList Routes
	app.route('/parts')
		.get(partsController.listAllParts)
		.post(partsController.createPart);

	app.route('/parts/:partId')
		.get(partsController.getPartById)
		.put(partsController.updatePart)
		.delete(partsController.deleteTask);
};