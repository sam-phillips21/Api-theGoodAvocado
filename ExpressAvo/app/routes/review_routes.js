// Express docs: http://expressjs.com/en/api.html
const express = require('express')
// Passport docs: http://www.passportjs.org/docs/
const passport = require('passport')

// pull in Mongoose model for reviews
const Review = require('../models/review')

// this is a collection of methods that help us detect situations when we need
// to throw a custom error
const customErrors = require('../../lib/custom_errors')

// we'll use this function to send 404 when non-existant document is requested
const handle404 = customErrors.handle404
// we'll use this function to send 401 when a user tries to modify a resource
// that's owned by someone else
const requireOwnership = customErrors.requireOwnership

// this is middleware that will remove blank fields from `req.body`, e.g.
// { review: { title: '', text: 'foo' } } -> { review: { text: 'foo' } }
const removeBlanks = require('../../lib/remove_blank_fields')
// passing this as a second argument to `router.<verb>` will make it
// so that a token MUST be passed for that route to be available
// it will also set `req.user`
const requireToken = passport.authenticate('bearer', { session: false })

// instantiate a router (mini app that only handles routes)
const router = express.Router()

//* INDEX
//* /reviews
router.get('/reviews', (req, res, next) => {
    Review.find()
        .populate('owner')
        .then(reviews => {
            return reviews.map(review => review)
        })
        .then(reviews => {
            res.status(200).json({ reviews: reviews })
        })
        .catch(next)
})

//* SHOW
//* /reviews/:id
router.get('/reviews/:id', (req, res, next) => {
    Review.findById(req.params.id)
        .populate('owner')
        .then(handle404)
        .then(review => {
            res.status(200).json({ review: review})
        })
        .catch(next)
})

//* CREATE
//* /reviews
router.post('/reviews', requireToken, (req, res, next) => {
    req.body.review.owner = req.user.id

    // on the front end, I HAVE to send a review as the top level key
    Review.create(req.body.review)
    .then(review => {
        res.status(201).json({ review: review })
    })
    .catch(next)
    // ^^^ shorthand for:
        //^ .catch(error => next(error))
})

// index that shows only the user's reviews
router.get('/mine', (req, res, next) => {
    // destructure user info from req.session
    // const { username, userId, loggedIn } = req.session
	Review.find({ owner: userId })
		// .then(reviews => {
		// 	res.render('reviews/index', { reviews, username, loggedIn })
		// })
		.then(reviews => {
            res.status(200).json({ reviews: reviews })
        })
		.catch(next)
})

// UPDATE
// PATCH /reviews/5a7db6c74d55bc51bdf39793
router.patch('/reviews/:id', requireToken, removeBlanks, (req, res, next) => {
	// if the client attempts to change the `owner` property by including a new
	// owner, prevent that by deleting that key/value pair
	delete req.body.review.owner

	Review.findById(req.params.id)
		.then(handle404)
		.then((review) => {
			// pass the `req` object and the Mongoose record to `requireOwnership`
			// it will throw an error if the current user isn't the owner
			requireOwnership(req, review)

			// pass the result of Mongoose's `.update` to the next `.then`
			return review.updateOne(req.body.review)
		})
		// if that succeeded, return 204 and no JSON
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


//* DESTROY
router.delete('/reviews/:id', requireToken, (req, res, next) => {
	Review.findById(req.params.id)
		.then(handle404)
		.then((review) => {
			// throw an error if current user doesn't own `review`
			requireOwnership(req, review)
			// delete the review ONLY IF the above didn't throw
			review.deleteOne()
		})
		// send back 204 and no content if the deletion succeeded
		.then(() => res.sendStatus(204))
		// if an error occurs, pass it to the handler
		.catch(next)
})


module.exports = router