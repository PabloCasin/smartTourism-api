const express = require('express');
const app = express()
const router = express.Router()
const mongoose = require('mongoose')
const {Restaurant} = require('../schemas/restaurant')
const { fakerES: faker } = require('@faker-js/faker');

router.route('/')
    .get((req,res)=>{

    })
    .post((req,res)=>{})
    .put((req,res)=>{})
    .delete((req,res)=>{})

router.route('/:province')
    
    .get((req,res)=>{
        const {province} = req.params
        Restaurant.find({province:province}).then(
            (rest)=>{
                res.json(rest)
            },
            (err)=>{
                throw err
            }
        )
    })
    
router.route('/faker/:q')
    .post((req,res)=>{
        const quanty = req.params.q
        let restaurants=[]
        for(i=0;i<=quanty; i++){
           const rest = new Restaurant
            rest.name = faker.company.name()
            rest.address = faker.location.streetAddress(false)
            rest.city = faker.location.city()
            rest.province = faker.location.county()
            rest.phone = faker.phone.number({ style: 'human' })
            rest.description = faker.lorem.paragraph(2)
            rest.category = faker.food.ethnicCategory()

            for (i=1; i<= faker.number.int({ min: 0, max: 8 });i++){
                let img = faker.image.url({width:640,height:480})
                rest.photos.push(img)
            }

            for(n=0; n<= faker.number.int({ min: 0, max: 4 });n++){
                let promo = {
                    name: faker.lorem.sentence(5),
                    promoDesc: faker.lorem.paragraph(3),
                    promoConditions: faker.lorem.paragraph(5),
                    promoDateFrom: faker.date.soon({ days: 10, refDate: '2020-04-17T00:00:00.000Z' }),
                    promoDateTo: faker.date.soon({ days: 10, refDate: '2020-04-17T00:00:00.000Z' }),
                    promoPhoto:faker.image.url({width:640,height:480})
                }

                rest.promos.push(promo)
            }

            for(r=0; r<= faker.number.int({ min: 0, max: 10 });r++){
                let review ={
                    reviewAuthor:faker.person.fullName(),
                    reviewDate:faker.date.anytime(),
                    reviewDescription:faker.lorem.paragraph({min:1,max:6}),
                    reviewTitle:faker.lorem.sentence({ min: 3, max: 5 }),
                    reviewStars:faker.number.int({ min: 1, max: 5 }),
                    reviewLikes:faker.number.int({ min: 0, max: 100 }),
                    reviewPhotos:[]
                }
                for (i=1; i<= faker.number.int({ min: 0, max: 8 });i++){
                    let img = faker.image.url({width:640,height:480})
                    review.reviewPhotos.push(img)
                }

                rest.reviews.push(review)
            }
            
            for (m=1;m<= faker.number.int({ min: 1, max: 6 });m++){
                let menu = faker.company.buzzAdjective()
                let menuItems =[]
                for (d=1;d<= faker.number.int({ min: 1, max: 12 });d++){
                    let dish = {
                        photoItem:faker.image.url({width:640,height:480}),
                        nameItem:faker.food.dish(),
                        priceItem:faker.commerce.price({ min: 10, max: 200,symbol: '€' }),
                        allergenItem:faker.helpers.arrayElements(['gluten','eggs','peanuts','milk','celery','sesame','lupin','crustaceans','fish','soy','tree nuts','mustard','sulphites','molluscs'],{ min: 0, max: 14 })
                        }
                    menuItems.push(dish)
                }
                rest.menu.push({menuName:menu,menuItems:menuItems})
            }
            rest.save().then(
                (c)=>{
                },
                (e)=>{
                }
            )
            restaurants.push(rest)
        }
        res.json(restaurants)
    })
module.exports = router