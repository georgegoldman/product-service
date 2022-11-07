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
    Database = require('./src/configs/database'),
    productRoute = require('./src/routes/product'),
    errorHandler = require('./src/middlewares/error_handler')

//initialize database
new Database(config.mongo.URI)

//middleware instantiation
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors())

//init routing
app.use("/api/v1/product", productRoute)

app.use((err, req, res, next) => {
    errorHandler(err, req, res, next);
});


app.listen(port, () => {
    console.log(`Listening to port : ${port}`)
})
