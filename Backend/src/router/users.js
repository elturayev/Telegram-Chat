const router = require('express').Router()
const tokenUserID = require('../middlewares/token.js')
const controller = require('../controllers/users.js')
router.get('/',tokenUserID.token,controller.GET)
router.get('/:userId',tokenUserID.token,controller.GET)
router.get('/one/:one',tokenUserID.token,controller.GET)


module.exports = router