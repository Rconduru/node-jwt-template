const queryParser = require('express-query-int')
const bodyParser = require('body-parser')
const allowCors = require('./cors')

module.exports = function(server){
    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())
    server.use(queryParser())
    server.use(allowCors)
}
