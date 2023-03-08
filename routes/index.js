const Router = require('express')
const router = new Router()
const roleRouter = require('./roleRouter')
const userRouter = require('./userRouter')

router.use('/role', roleRouter)
router.use('/user', userRouter)

module.exports = router
