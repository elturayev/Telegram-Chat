const GET = (request,response,next)=>{
	try{
		const { search } = request.query
		const { userId,one } = request.params 
		let res = request.select('users')
		if(search){
			res = res.filter(el=>{
				if((el.username).includes(search)){
					return el
				}
			})
		}
		if(userId){
			res = res.find(el=> el.userId == userId)
		 res.password = '...'
		}
		if(one){
			res = res.find(el=> el.userId == request.userId)
			 res.password ='...'
		}
		response.json(res)

	}catch(error){
		return next(error)
	}
}

module.exports = {
	GET
}