const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')

router.post('/create-user', userController.userCreate)
router.post('/login', userController.login)
router.post('/get-users', userController.getUsers)
router.post('/update', userController.updateUser)

module.exports = router
