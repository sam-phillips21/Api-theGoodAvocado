const mongoose = require('mongoose')
const reviewSchema = require('./review')

const restaurantSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		type: {
			type: String,
			required: true,
		},
		address: {
			type: String,
			required: true
		},
		telephone: {
			type: String, 
			required: true
		},
		delivery: { 
			type: Boolean,
			required: true
		},
		isUserRestaurantOwner: { 
			type: Boolean,
			required: true
		},
		reviews: [reviewSchema],
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User'
		},
	},
	{
		timestamps: true,
	}
)

module.exports = mongoose.model('Restaurant', restaurantSchema)
