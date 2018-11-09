const mongoose = require('mongoose');//
const Loc = mongoose.model('food');

var sendJsonResponse = function(res, status, content) {
res.status(status);
res.json(content);
};


/* code for creating a nre record in Database*/
module.exports.foodCreate = function(req, res) {
	Loc.create({
		name: req.body.name,
		date: req.body.date,
		expiry: req.body.expiry,
		left_overs: req.body.left_overs,
		quantity: req.body.quantity,
	}, (err, food)=> {
		if (err) {
			res 
                .status(404) 
                .json(err);
		} else {
			res 
			   .status(201) 
			   .json(food);
		}
	});
};

/*code for reading one record at a time*/
module.exports.foodReadOne = function(req, res) {
		if (req.params && req.params.foodid) {
			Loc
			.findById(req.params.foodid)
			.exec((err, food)=> {
				if (!food) {
					res 
                      .status(404) 
                      .json({ 
                         "message": "locationid not found" 
                    });
					return;
				} else if (err) {
					res 
                       .status(404) 
                       .json(err);
					return;
				}
				res
				   .status(200)
				   .json(food)
				});
		} else {
			res
					.status(404)
					.json({"message": "No foodid in request"
			});
		}
};


/*Code for updating any record in database*/
module.exports.foodUpdateOne = function(req, res) {
	if (!req.params.foodid) {
		res
			.status(404)
			.json({
			"message": "Not found, foodid is required"
		});
		return;
	}
	Loc
	.findById(req.params.foodid)
	.exec((err, food)=> {
		if (!food) {
			res
				.status(404)
				.json({
						"message": "foodid not found"
				});
			return;
		} else if (err) {
			res 
			   .status(404) 
			   .json(err);
			return;
		}
		food.name= req.body.name;
		food.date= req.body.date;
		food.expiry= req.body.expiry;
		food.left_overs= req.body.left_overs;
		food.quantity= req.body.quantity;
		food.save(function(err, food) {
			if (err) {
				res 
                    .status(404) 
                    .json(err);
			} else {
				res
					.status(200)
					.json(food);
			}
		});
	}
	);
};


/*code for deleting record from database*/
module.exports.foodDeleteOne = function(req, res) {
	var foodid = req.params.foodid;
	if (foodid) {
		Loc
		.findByIdAndRemove(foodid)
		.exec((err, food)=> {
			if (err) {
				res
					.status(404)
					.json(err);
			return;
			}
				res
					.status(204)
					.json(null);
		});
	} else {
		res
			.status(404)
			.json({
					"message": "No foodid"
			});
	}
};