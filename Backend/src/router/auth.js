const router = require('express').Router()
const controller = require('../controllers/auth.js')
const validator = require('../middlewares/validation.js')
router.post('/login',validator.validLogin,controller.LOGIN)
router.post('/register',validator.validRegister,controller.REGISTER)


module.exports = router