const { sign } = require('../utils/jwt.js')
const sha256 = require('sha256')
const path = require('path')

const LOGIN = (request,response,next)=>{
	try{
		const { username, password } = request.body
		let user = request.select('users')
		user = user.find(el=> el.username == username && el.password == sha256(password))
		if(!user) throw new Error('User not found!')
		delete user.password
		response.json({
			user,
			message: "The user is logged!",
			token: sign({userId: user.userId, agent: request.headers['user-agent']})
		})

	}catch(error){
		return next(error)
	}
}

const REGISTER = (request,response,next)=>{
	try{

		const { file } = request.files
		const { username, password } = request.body
		let imageName = file.name.replace(/\s/g,'')
		let users = request.select('users')
		let newUser = {
			userId: (users.length ? users[users.length - 1].userId + 1 :1),
			username,
			password: sha256(password),
			profileImg: '/images/' + imageName
		}

		file.mv(path.join(process.cwd(), 'src','files','images',imageName))
		users.push(newUser)
		request.insert('users',users)
		delete newUser.password
		response.json({
			user: newUser,
			message: "The user is successfully registered!",
			token: sign({userId: newUser.userId, agent: request.headers['user-agent']})
		})

	}catch(error){
		return next(error)
	}
	return next()
}




module.exports = {
	LOGIN,
	REGISTER
}