const mongoose = require('mongoose')
const Avo = require('./Avo')
const db = require('../../config/db')
// update seed as : name, type, address, telephone, delivery, isUserRestaurantOwner, reviews

const startAvos = [
    { name: 'The Capital Grille', type: 'American', address:'1450 Larimer St, Denver, CO 80202', telephone:'303-539-2500', delivery: false, isUserRestuarantOwner: false},
    { name: 'Tacos Tequila Whiskey', type: 'Mexican', address:'1514 York St, Denver, CO 80206-1425', telephone:'720-475-1337', delivery: false, isUserRestuarantOwner: false},
    { name: 'True Food Kitchen', type: 'American', address:'2800 E 2nd Ave Unit 101, Denver, CO 80206-4914', telephone: '720-509-7661', delivery: false, isUserRestuarantOwner: false},
    { name: 'Ocean Prime', type: 'Seafood', address:'1465 Larimer St, Denver, CO 80202', telephone:'303-825-3663', delivery: false, isUserRestuarantOwner: false},
    {name: 'North Street Grille' , type: 'American' , address: '229 North St, Boston, MA 02113-2105' , telephone: '617-720-2010', delivery: false , isUserRestuarantOwner: false},
    {name: 'Eataly', type: 'Italian' , address: '800 Boylston Street Prudential Center, Boston, MA 02199' , telephone:'617-807-7300', delivery: false , isUserRestuarantOwner: false},
    {name: 'Sweetgreen' , type: 'Healthy American', address:'659 Boylston St, Boston, MA 02116' , telephone: '617-936-3464', delivery: false, isUserRestuarantOwner: false},
    {name: 'Cafe Bonjour' , type: 'American Cafe', address: '55 Temple Pl, Boston, MA 02111-1300' , telephone: '617-779-0062', delivery: false, isUserRestuarantOwner: false},
    {name: 'Boston Sail Loft Restaurant' , type: 'American Bar and Seafood' , address:'80 Atlantic Ave, Boston, MA 02110-3614' , telephone: '617-227-7280' , delivery: false , isUserRestuarantOwner: false},
    {name: 'Olio e Più', type: 'Italian, Pizza, Neapolitan' , address: '3 Greenwich Ave, New York City, NY 10014', telephone: '212-243-6546', delivery: true, isUserRestuarantOwner: false},
    {name: 'The Consulate', type: 'French, American, Vegetarian Friendly', address: '519 Columbus Ave, New York City, NY 10024-3402', telephone: '646-781-9288', delivery: true, isUserRestuarantOwner: false},
    {name: 'Boucherie Union Square', type: 'French Steakhouse, Gluten Free Options' , address: '225 Park Avenue South, New York City, NY 10003-1604', telephone: '212-353-0200', delivery: true , isUserRestuarantOwner: false},
    {name: 'Em Vietnamese Bistro', type: 'Seafood, Asian, Vietnamese', address: '57 Front St, Brooklyn, NY 11201-1237', telephone: '718-875-7888', delivery: true, isUserRestuarantOwner: false},
    {name: 'Shin', type: 'JapaneseSushiAsian', address: '1655 N La Brea Ave Corner of Hollywood Blvd and La Brea Ave, Los Angeles, CA 90028', telephone: '323-874-4692', delivery: false, isUserRestuarantOwner: false},
    {name: 'Raffaello Ristorante', type: 'Italian, Vegetarian Friendly, Vegan Options' , address: '400 S Pacific Ave, Los Angeles, CA 90731-2626', telephone: '310-514-0900', delivery: false, isUserRestuarantOwner: false},
    {name:'Langers' , type: 'American Deli, Diner', address: '704 S Alvarado St, Los Angeles, CA 90057-4020', telephone: '213-483-8050', delivery: true, isUserRestuarantOwner: false},
    { name: 'Causeway Restaurant', type: 'American, Seafood', address:'78 Essex Ave, Gloucester, MA 01930-4930', telephone:'978-281-5256', delivery: false, isUserRestuarantOwner: false},
    { name: 'Seaport Grill', type: 'Seafood, American, Italian', address:'6 Rowe Sq, Gloucester, MA 01930-3057', telephone:'978-282-9799', delivery: false, isUserRestuarantOwner: false},
    { name: 'Azorean Restaurant and Bar', type: 'Portuguese', address:' 133 Washington St, Gloucester, MA 01930-2652', telephone:'978-283-5500', delivery: false, isUserRestuarantOwner: false},
    { name: 'Captain Hooks', type: 'Italian', address:'406 Washington St, Gloucester, MA', telephone:'978-282-4665', delivery: true, isUserRestuarantOwner: false},
    { name: 'Tacos Lupita', type: 'Mexican', address:'63 Washington St, Gloucester, MA 01930-3532', telephone:'978-282-9600', delivery: false, isUserRestuarantOwner: false}

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