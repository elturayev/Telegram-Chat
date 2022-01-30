const Joi = require('joi')

let userSchema = Joi.object({
	username: Joi.string().max(30).alphanum().required(),
	password: Joi.string().min(5).max(15).pattern(new RegExp(/(?=.*[a-zA-Z]+)(?=.*[0-9]+)(?=.*[!@#$%^&*]+)/))
})

const validLogin = (request,response,next)=>{
	try{
		const {username, password} = request.body
		if(!username || !password) throw new Error('username or password is required!')
		let { value,error } = userSchema.validate(request.body)
		if(error)return next(error)
		return next()

	}catch(error){
		return next(error)
	}
}


const validRegister = (request,response,next)=>{
	try{
		const { file } = request.files
		const { username, password } = request.body
		const { value, error } = userSchema.validate(request.body)
		const users = request.select('users')
		let user = users.find(el=> el.username == username)
		if(user) throw new Error('Username is available!')
		if(error) return next(error)
		if(!file) throw new Error('The file is required!')
		if(!(['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype))){
			throw new Error('The file format should be .png or .jpg!')
		}
		if(file.size > (10 * 1024 * 1024)) throw new Error('The file size should be less than 10MB!')
		
		return next()
	}catch(error){
		return next(error)
	}
}

module.exports = {
	validLogin,
	validRegister
}