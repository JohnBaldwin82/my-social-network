const router = require('express').Router()

const {
    getAllThoughts,
    getThoughtsById,
    createThought,
    addReaction,
    deleteReaction,
    reviseThought,
    removeThought,
} = require('../../controllers/thoughtControllers.js')

router.route('/').get(getAllThoughts).post(createThought)

router
.route('/:id')
.get(getThoughtsById)
.put(reviseThought)
.delete(removeThought)

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction)
router.route('/:thoughtId/reactions').post(addReaction)

module.exports = router;