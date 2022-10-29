const mongoose = require('mongoose')
const Avo = require('./Avo')
const db = require('../../config/db')
// update seed as : name, type, address, telephone, delivery, isUserRestaurantOwner, reviews

const startAvos = [
    { name: 'The Capital Grille', Type: 'American', address:'1450 Larimer St, Denver, CO 80202', telephone:'+1 303-539-2500', Delivery: false, isUserRestuarantOwner: false },
    { name: 'Tacos Tequila Whiskey', Type: 'Mexican', address:'1514 York St, Denver, CO 80206-1425', telephone:'+1 720-475-1337', Delivery: false, isUserRestuarantOwner: false},
    { name: 'True Food Kitchen', Type: 'American', address:'2800 E 2nd Ave Unit 101, Denver, CO 80206-4914', telephone:'+1 720-509-7661', Delivery: false, isUserRestuarantOwner: false},
    { name: 'Ocean Prime', Type: 'Seafood', address:'1465 Larimer St, Denver, CO 80202', telephone:'+1 303-825-3663', Delivery: false, isUserRestuarantOwner: false}
]

mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => { 
        Avo.deleteMany({ owner: null })
        .then(deletedAvos => {
           
          
            Avo.create(startAvos)
                .then(newAvo => {
                    console.log('the new avos', newAvos)
                    mongoose.connection.close()
                })
                .catch(error => {
                    console.log(error)
                    mongoose.connection.close()
                })
        })
        .catch(error => {
            console.log(error)
            mongoose.connection.close()
        })
})
.catch(error => {
    console.log(error)
    mongoose.connection.close()
})