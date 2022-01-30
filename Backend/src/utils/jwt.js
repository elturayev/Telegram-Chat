const jwt = require('jsonwebtoken')

const token = {
	sign: (peyload)=> jwt.sign(peyload, 'SECRET_KEY'),
	verify: (token)=> jwt.verify(token, 'SECRET_KEY')
}

module.exports = token