const router =  require('express').Router()
const controller = require('../controllers/message.js')
const tokenUserID = require('../middlewares/token.js')

router.get('/',tokenUserID.token,controller.GET)
router.get('/token/1',tokenUserID.token,controller.TOKEN)
router.get('/:userIdparams',tokenUserID.token,controller.GET)
router.post('/',tokenUserID.token,controller.POST)

module.exports = router