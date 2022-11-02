const express = require('express')
const passport = require('passport')

// pull in Mongoose model for restaurants
const Restaurant = require('../models/restaurant')
const Review = require('../models/review')
const User = require('../models/user')

const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
// const requireOwnership = customErrors.requireOwnership <-- not used anymore
const removeBlanks = require('../../lib/remove_blank_fields')
// const restaurant = require('../models/restaurant')
const requireToken = passport.authenticate('bearer', { session: false })
const router = express.Router()


//* INDEX
//* /reviews
router.get('/reviews', removeBlanks, (req, res, next) => {
    // console.log('this is being hit', res, next, req)
	// const review = req.body.review
	// const userId = req.params.userId
    // expression; greater than expected
    Restaurant.find()
        // .populate('author')
        .then(restaurants => {
          let reviews = [];

          restaurants.forEach((restaurant) => {
            
            if(restaurant.reviews.length > 0) {
              restaurant.reviews.forEach((review) => {
                let newReview = {'restaurant': restaurant, 'review': review}
                reviews.push(newReview)
              })
            }
          })
            console.log('reviews are', reviews)
            return reviews
        })
        .then(reviews => {
            res.status(200).json({ reviews: reviews })
        })
        .catch(next)
    })


// GET -> a restaurants review 
// GET /reviews/<restaurant_id>
router.get('/reviews/:restaurantId', removeBlanks, (req, res, next) => {
    // get the review from req.body
    const review = req.body.review
    const restaurantId = req.params.restaurantId
    // find the restaurant by its id
    Restaurant.findById(restaurantId)
        .then(handle404)
        .then(restaurant => res.status(201).json({ restaurant: restaurant }))
        // pass to the next thing
        .catch(next)
})

// POST -> anybody can give a restaurant a review
// POST /reviews/<restaurant_id>
router.post('/reviews/:restaurantId', removeBlanks, (req, res, next) => {
    // get the review from req.body
    const review = req.body.review
    const restaurantId = req.params.restaurantId
    // find the restaurant by its id
    Restaurant.findById(restaurantId)
        .then(handle404)
        // add the review to the restaurant
        .then(restaurant => {
            // push the review into the restaurant's review array and return the saved restaurant
            restaurant.reviews.push(review)

            return restaurant.save()
        })
        .then(restaurant => res.status(201).json({ restaurant: restaurant }))
        // pass to the next thing
        .catch(next)
})

// UPDATE a review
// PATCH -> /reviews/<restaurant_id>/<review_id>
router.patch('/reviews/:restaurantId/:reviewId', requireToken, removeBlanks, (req, res, next) => {
    const { restaurantId, reviewId } = req.params

    // find the restaurant
    Restaurant.findById(restaurantId)
        .then(handle404)
        .then(restaurant => {
            // get the specific review
            const theReview = restaurant.reviews.id(reviewId)
            // make sure the user owns the restaurant
            // requireOwnership(req, restaurant)

            // update that review with the req body
            theReview.set(req.body.review)

            return restaurant.save()
        })
        .then(restaurant => res.sendStatus(204))
        .catch(next)
})

// DESTROY a review
// DELETE -> /reviews/<restaurant_id>/<review_id>
router.delete('/reviews/:restaurantId/:reviewId', requireToken, (req, res, next) => {
    const { restaurantId, reviewId } = req.params

    // find the restaurant
    Restaurant.findById(restaurantId)
        .then(handle404)
        .then(restaurant => {
            // get the specific review
            const theReview = restaurant.reviews.id(reviewId)

            // make sure the user owns the restaurant
            // requireOwnership(req, restaurant)

            // update that review with the req body
            theReview.remove()

            return restaurant.save()
        })
        .then(restaurant => res.sendStatus(204))
        .catch(next)
})

// export router
module.exports = router