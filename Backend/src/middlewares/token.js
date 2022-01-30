
const { verify } = require('../utils/jwt.js')

const token = (request,response,next)=>{
	try{
		const  { userId } = verify(request.headers.token)
		if(!userId) throw new Error('Token is not found!')
		request.userId = userId
		return next()
	}catch(error){
		return next(error)
	}

}

module.exports = {
	token
}