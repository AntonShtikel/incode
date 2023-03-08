const Router = require('express')
const router = new Router()
const roleController = require('../controllers/roleController')

router.post('/create-role', roleController.roleCreation)

module.exports = router
