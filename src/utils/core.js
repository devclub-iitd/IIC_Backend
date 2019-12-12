const mongoose = require("mongoose");
const express = require('express');
const app = express();

const createResponse = require('../helper/helper');


function Core(model, field) {
	const name = model.collection.collectionName;

	function getStatic(req, res) {
		model.findOne({title: field}, function(err, static){
			if(!err) {
				res.status(200).json(createResponse("details for " + field + " are:", static.body.field));
			} else {
				console.log(err);
			}
		});
	}

	function getAll(req, res) {
		model.find({hidden: false}, function(err, result) {
			if(!err) {
				if (field) {
					res.status(200).json(createResponse("the following results were found: ", result.field));
				} else {
					res.status(200).json(createResponse("the following results were found: ", result));
				}
			} else {
				console.log(err);
			}
		});
	}

	function getID(req, res) {
		model.findById(req.params.id, function(err, result) {
			if(!err) {
				res.status(200).json(createResponse("the following " + name + " was found:", result));
			} else {
				console.log(err);
			}
		})
	}

	function create(req, res) {
		model.create(req.body, function(err, result) {
			if(!err) {
				res.status(200).json(createResponse(name + " created with details:", result));
			} else {
				console.log(err)
			}
		});
	}

	function updateID(req, res)  {
		if(req.user.access != 'superadmin') {
			model.findById(req.params.id, function(err, result) {
				if(!err) {
					if(result.addedBy.uid == req.user._id) {
						model.findByIdandUpdate(req.params.id, req.body, function(err, result) {
							if(!err) {
								res.status(200).json(createResponse("Details updated successfully", result));
							} else {
								console.log(err);
							}
						});	
					} else {
						// change status here
						res.status(200).json(createResponse("Details can't be changed as you did not create them", ""));
					}
				} else {
					console.log(err);
				}
			})			
		} else {
			model.findByIdandUpdate(req.params.id, req.body, function(err, result) {
				if(!err) {
					res.status(200).json(createResponse("Details updated successfully", result));
				} else {
					console.log(err);
				}
			})
		}
	}

	function deleteID(req, res) {
		if(req.user.access != 'superadmin') {
			model.findById(req.params.id, function(err, result) {
				if(!err) {
					if(result.addedBy.uid == req.user._id) {
						model.findByIdandRemove(req.params.id, function(err, result) {
							if(!err) {
								res.status(200).json(createResponse("Item deleted successfully", result));
							} else {
								console.log(err);
							}
						});	
					} else {
						// change status here
						res.status(200).json(createResponse("Cannot be deleted by you as you did not create it", ""));
					}
				} else {
					console.log(err);
				}
			})			
		} else {
			model.findByIdandDelete(req.params.id, function(err, result) {
				if(!err) {
					res.status(200).json(createResponse("Item deleted successfully", result));
				} else {
					console.log(err);
				}
			})
		}
	}

	return [getStatic, getAll, getID, create, updateID, deleteID];
}

module.exports = Core;