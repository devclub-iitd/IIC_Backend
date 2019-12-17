const mongoose = require("mongoose");
const express = require('express');
const app = express();

const createResponse = require('../helper/helper');


function Core(model, field, admin = false) {
	const name = model.collection.collectionName;

	function getStatic(req, res) {
		model.findOne({title: field}, function(err, static){
			if(!err) {
				res.status(200).json(createResponse(true, "details for " + field + " are:", static.body));
			} else {
				console.log(err);
			}
		});
	}

	function getAll(req, res) {
		if(!admin) {
			if(field == 'metaData') {
				model.find({hidden: false}, {metaData: 1}, function(err, result) {
					if(!err) {
						res.status(200).json(createResponse(true, "the following results were found: ", result));
					} else {
						console.log(err);
					}
				})
			} else {
				model.find({hidden: false}, function(err, result) {
					if(!err) {
						res.status(200).json(createResponse(true, "the following results were found: ", result));
					} else {
						console.log(err);
					}
				})
			}
		} else if(admin) {
			if(field == 'metaData') {
				model.find({}, {metaData: 1}, function(err, result) {
					if(!err) {
						res.status(200).json(createResponse(true, "the following results were found: ", result));
					} else {
						console.log(err);
					}
				})
			} else {
				model.find({}, function(err, result) {
					if(!err) {
						res.status(200).json(createResponse(true, "the following results were found: ", result));
					} else {
						console.log(err);
					}
				})
			}

		}
	}

	function getID(req, res) {
		model.findById(req.params.id, function(err, result) {
			if(!err) {
				res.status(200).json(createResponse(true, "the following " + name + " was found:", result));
			} else {
				console.log(err);
			}
		})
	}

	function create(req, res) {
		model.create(req.body, function(err, result) {
			if(!err) {
				res.status(200).json(createResponse(true, name + " created with details:", result));
			} else {
				console.log(err)
			}
		});
	}

	function updateID(req, res)  {
		if(req.user.access != 'superadmin') {
			model.findById(req.params.id, function(err, result) {
				if(!err) {
					if(result.addedBy.uid.equals(req.user._id)) {
						model.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, result) {
							if(!err) {
								res.status(200).json(createResponse(true, "Details updated successfully", result));
							} else {
								console.log(err);
							}
						});	
					} else {
						// change status here
						res.status(200).json(createResponse(false, "Details can't be changed as you did not create them", ""));
					}
				} else {
					console.log(err);
				}
			})			
		} else if(req.user.access == 'superadmin') {
			model.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, result) {
				if(!err) {
					res.status(200).json(createResponse(true, "Details updated successfully", result));
				} else {
					console.log(err);
				}
			})
		} else {
			//change status code
			res.status(200).json(createResponse(false, "Sorry you cannot do this action", ""));
		}
	}

	function deleteID(req, res) {
		if(req.user.access != 'superadmin') {
			model.findById(req.params.id, function(err, result) {
				if(!err) {
					if(result.addedBy.uid.equals(req.user._id)) {
						model.findByIdAndRemove(req.params.id, function(err, result) {
							if(!err) {
								res.status(200).json(createResponse(true, "Item deleted successfully", result));
							} else {
								console.log(err);
							}
						});	
					} else {
						// change status here
						res.status(200).json(createResponse(false, "Cannot be deleted by you as you did not create it", ""));
					}
				} else {
					console.log(err);
				}
			})			
		} else if(req.user.access == 'superadmin') {
			model.findByIdAndRemove(req.params.id, function(err, result) {
				if(!err) {
					res.status(200).json(createResponse(true, "Item deleted successfully", result));
				} else {
					console.log(err);
				}
			})
		} else {
			//change status code
			res.status(200).json(createResponse(false, "Sorry you cannot do this action", ""));
		}
	}

	return [getStatic, getAll, getID, create, updateID, deleteID];
}

module.exports = Core;