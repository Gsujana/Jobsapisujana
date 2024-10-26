const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = (req,res,next) =>{
    const authHeader = req.headers.authorization
    //console.log(authHeader)
    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new UnauthenticatedError('Authentication invalid')
    }
    const token = authHeader.split(' ')[1]
    //console.log(token)
    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = {userId:payload.userId, name:payload.name}
        //console.log(req.user.userID)
        next()
    }catch(error){
        throw new UnauthenticatedError('Authentication invalid')
    }
}


module.exports = auth