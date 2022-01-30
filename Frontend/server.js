const express = require('express')
const ejs = require('ejs')
const PORT  = process.env.PORT || 5001
const path = require('path')

const app = express()
app.engine('html', ejs.renderFile)
app.set('view engine','html')
app.use(express.static(path.join('public')))
app.get('/',(request,response)=> response.render('index'))
app.get('/login',(request,response)=> response.render('login'))
app.get('/register',(request,response)=> response.render('register'))

app.listen(PORT, ()=> console.log('Frontend server is running on http://localhost:' + PORT))