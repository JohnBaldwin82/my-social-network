const router = require('express').Router()
const userRoute = require('./userRoute')
const thoughtRoute = require('./thoughtRoute') 

router.use('/api/user', userRoute)
router.use('/api/thought', thoughtRoute)

module.exports = router