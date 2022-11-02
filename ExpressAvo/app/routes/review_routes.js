/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const express = require('express')
const passport = require('passport')

/////////////////////////////////////////////
// Import Models
/////////////////////////////////////////////
const Restaurant = require('../models/restaurant')
const customErrors = require('../../lib/custom_errors')
const handle404 = customErrors.handle404
const requireOwnership = customErrors.requireOwnership 
const removeBlanks = require('../../lib/remove_blank_fields')
const requireToken = passport.authenticate('bearer', { session: false })

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
/////////////////////////////////////////////

//* Index- user reviews
// GET
router.get('/reviews', removeBlanks, (req, res, next) => {
    Restaurant.find()
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
        // pass to the next thing
        .catch(next)
    })


// Show -> a restaurants review
// GET 
router.get('/reviews/:restaurantId', removeBlanks, (req, res, next) => {
    // get the review from req.body
    const restaurantId = req.params.restaurantId
    // find the restaurant by its id
    Restaurant.findById(restaurantId)
        .then(handle404)
        .then(restaurant => res.status(201).json({ restaurant: restaurant }))
        // pass to the next thing
        .catch(next)
})

// Create -> anybody can give a restaurant a review
// POST
router.post('/reviews/:restaurantId', removeBlanks, (req, res, next) => {
    // get the review from req.body
    const review = req.body.review
    console.log(review)
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
// PATCH 
router.patch('/reviews/:restaurantId/:reviewId', requireToken, removeBlanks, (req, res, next) => {
    const { restaurantId, reviewId } = req.params
    console.log(req.body, req.user)
    // find the restaurant
    Restaurant.findById(restaurantId)
        .then(handle404)
        .then(restaurant => {
            // get the specific review
            const theReview = restaurant.reviews.id(reviewId)
            // make sure the user owns the restaurant
            requireOwnership(req, theReview)

            // update that review with the req body
            theReview.set(req.body.review)

            return restaurant.save()
        })
        .then(restaurant => res.sendStatus(204))
        .catch(next)
})

// Delete a review
// DESTROY 
router.delete('/reviews/:restaurantId/:reviewId', requireToken, (req, res, next) => {
    const { restaurantId, reviewId } = req.params
    // find the restaurant
    Restaurant.findById(restaurantId)
        .then(handle404)
        .then(restaurant => {
            // get the specific review
            const theReview = restaurant.reviews.id(reviewId)
            // make sure the user owns the restaurant
            requireOwnership(req, theReview)
            // update that review with the req body
            theReview.remove()

            return restaurant.save()
        })
        .then(restaurant => res.sendStatus(204))
        .catch(next)
})

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router