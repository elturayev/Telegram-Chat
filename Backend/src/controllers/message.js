const GET = (request,response,next)=>{
	try{	
		const { userId, sendUserId } = request.query
		const { userIdparams } = request.params
		let message = request.select('message')
		if(userIdparams){
			message = message.filter(el=>{
				if(el.userId == userIdparams || el.sendUserId == userIdparams){
					return el
				}
			})
		}
		else{
			
			message = message.filter(chat =>{
				if((chat.userId == userId && chat.sendUserId == sendUserId)||
					chat.userId == sendUserId && chat.sendUserId == userId
					){
					return chat
				}
			})
		}
		return response.json(message)

	}catch(error){
		return next(error)
	}
}


const POST = (request,response,next)=>{
	try{
		const {sendUserId,messageText} = request.body
		const message = request.select('message')
		let newMessage = {
			messageId: (message.length ? message[message.length - 1].messageId + 1: 1),
			userId: request.userId,
			messageType: "text",
			messageDate: new Date(),
			messageText,
			sendUserId
		}

		message.push(newMessage)
		request.insert('message',message)
		response.json({
			chat: newMessage,
			message: "Chat sended!"
		})

	}catch(error){
		return next(error)
	}
}

const TOKEN = (request,response)=>{
	response.json({
		token: true
	})
}

module.exports = {
	GET,
	POST,
	TOKEN
}