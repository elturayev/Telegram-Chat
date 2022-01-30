const express = require('express')
const PORT = process.env.PORT || 5000
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const app = express()
app.use(cors())
app.use(fileUpload())
app.use(express.json())
const model = require('./middlewares/model.js')
app.use(model)
app.use(express.static(path.join(__dirname,'files')))
const authRoute = require('./router/auth.js')
const userRoute = require('./router/users.js')
const messageRoute = require('./router/message.js')

app.use('/auth',authRoute)
app.use('/users',userRoute)
app.use('/message',messageRoute)


app.use((error,request,response,next)=>{
	response.json({message: error.message})
})

app.listen(PORT, ()=> console.log('Backend server is running on http://localhost:'+PORT))
