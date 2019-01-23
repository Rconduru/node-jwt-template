const port = 3003

const applyMiddlewares = require('./middlewares/applyMiddlewares')
const applyRoutes = require('./middlewares/applyRoutes')

const express = require('express')
const server = express()

require('./config/database')

server.listen(port, function(){
    console.log(`BACKEND is running on port ${port}.`);
})

applyMiddlewares(server)
applyRoutes(server)
