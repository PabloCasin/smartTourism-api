const mongoose = require('mongoose')

const restaurantSchema = new mongoose.Schema({
    name:{ type: String},
    address:{ type: String},
    city:{ type: String},
    province:{ type: String},
    phone:{ type: String},
    description:{ type: String},
    category:{ type: String},
    extras:{ type: Array},
    photos:{ type:Array },
    menu:
        [
            {
                menuName:{ type:String },
                menuItems:[
                    {
                    photoItem:{ type: String },
                    nameItem:{ type: String},
                    priceItem:{type: String},
                    allergenItem:{type: Array}
                    }
                ]
            }
        ],
    promos:
        [
            {
                promoName:{type:String},
                promoDesc:{type:String},
                promoConditions:{type:String},
                promoPhoto:{type:String},
                promoDateFrom:{type:Date},
                promoDateTo:{type:Date}
            }
        ],
    reviews:
        [
            {
                reviewAuthor:{ type:String },
                reviewDate:{ type:Date},
                reviewDescription: {type:String},
                reviewTitle: {type:String},
                reviewStars:{type:Number},
                reviewLikes:{type:Number},
                reviewPhotos:{type:Array},

            }
        ]
    
})

const Restaurant = mongoose.model('restaurant',restaurantSchema)

module.exports.Restaurant = Restaurant