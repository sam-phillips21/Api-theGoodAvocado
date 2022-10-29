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
		location: {
			type: Boolean,
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
		// we're going to add virtuals to our model, and we need to tell our schema to use those virtuals when converting from BSON to JSON or an object
		// toObject: { virtuals: true },
		// toJSON: { virtuals: true }
	}
)

// virtuals
// these are virtual properties that are added to the model when returning from the database but they aren't saved in the database
// these are javascript functions that process upon resource retrieval
// virtuals basically add a new key-value pair to our resource
// petSchema.virtual('fullTitle').get(function () {
// 	// inside virtual functions we can do any JS we want to return a value for a new key
// 	// the 'this' keyword can only be used with a function declaration
// 	return `${this.name} the ${this.type}`
// })

// petSchema.virtual('isABaby').get(function () {
// 	if ( this.age < 5) {
// 		return `yeah, they're just a baby`
// 	} else if (this.age >= 5 && this.age < 10) {
// 		return `not really a baby, but still a baby`
// 	} else {
// 		return 'definitely not a baby'
// 	}
// })

module.exports = mongoose.model('Restaurant', restaurantSchema)
