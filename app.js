const express = require('express');
const app = express()
const restaurantsRoutes = require('./routes/restaurants')
const mongoose = require('mongoose')

async function main() {
    await mongoose.connect('mongodb://localhost:27017/smartTourism');
}

main()

app.use('/restaurants', restaurantsRoutes);

app.get('/',(req,res)=>{

})

app.listen(3000,()=>{
    console.log("sirviendo en el puerto 3000")
})