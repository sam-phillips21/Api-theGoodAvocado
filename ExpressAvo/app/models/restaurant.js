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
		otherTypes: {
			type: String,
			required: true,
			default: null
		},
		address: {
			type: String,
			required: true
		},
		telephone: {
			type: String, 
			required: true
		},
		isUserRestaurantOwner: { 
			type: Boolean,
			required: true,
			default: false
		},
		delivery: { 
			type: Boolean,
			required: true,
			default: false
		},
		reservations: {
			type: Boolean,
			required: true,
			default: false
		},
		takeout: {
			type: Boolean,
			required: true,
			default: false
		},
		catering: {
			type: Boolean,
			required: true,
			default: false
		},
		acceptsCreditCard: {
			type: Boolean,
			required: true,
			default: false
		},
		parking: {
			type: Boolean,
			required: true,
			default: false
		},
		wifi: {
			type: Boolean,
			required: true,
			default: false
		},
		masksRequired: {
			type: Boolean,
			required: true,
			default: false
		},
		alchohol: {
			type: Boolean,
			required: true,
			default: false
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
