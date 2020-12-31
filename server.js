const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
require('dotenv/config')

const app = express()

mongoose.connect(process.env.DATABASE_URL, 
    { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }, () => {
        console.log('mongoDb connected')
    })

app.set('view engine', 'ejs')
app.use(expressLayouts)    
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));

app.get('/', (req, res) => {
    res.send('Home')
})    
app.use('/posts', require('./routes/posts'))    

const PORT = process.env.PORT || 3000    
app.listen(PORT, () => {
    console.log('server started on port: ' + PORT)
})

