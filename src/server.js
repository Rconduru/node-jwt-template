const port = 3003

const applyMiddlewares = require('./middlewares/applyMiddlewares')

const express = require('express')
const server = express()

require('./config/database')
applyMiddlewares(server)

server.listen(port, function(){
    console.log(`BACKEND is running on port ${port}.`);
})
