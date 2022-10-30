const mongoose = require('mongoose')
const Avo = require('./Avo')
const db = require('../../config/db')

const startAvos = [
    { name: 'The Capital Grille', Type: 'American', Location: 'Denver', Delivery: false},
    { name: 'Tacos Tequila Whiskey', Type: 'Mexican', Location: 'Denver', Delivery: false},
    { name: 'True Food Kitchen', Type: 'American', Location: 'Denver', Delivery: false},
    { name: 'Ocean Prime', Type: 'Seafood', Location: 'Denver', Delivery: false}
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