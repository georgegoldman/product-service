// initiating the env funtion enable env
require('dotenv').config()


const 
    express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    cors = require('cors')
const 
    config = require('./src/configs/configs')(),
    port = config.app.port,
    customerRoute = require('./src/routes/customer');

//initialize database
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

//init routing
app.use("/api/v1/customer", customerRoute)



app.listen(port, () => {
    console.log(`Listening to port : ${port}`)
})