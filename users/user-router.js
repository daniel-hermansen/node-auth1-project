const Users = require('./user-model.js')

const router = express.Router()


router.get('/', needLogin, async (req, res) => {
    const found = await Users.find()
    try {
        if (found) {
            res.status(200).json(found)
        } else {
            res.status(401).json('No Users to Display')
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;