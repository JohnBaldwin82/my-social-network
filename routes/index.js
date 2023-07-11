const router = require('express')
const apiRoutes = ('./api')

router.use('/api', apiRoutes)

router.use((req, res) => {
    res.status(404).send('404 Error!!')
});


module.exports = router;