const Users = require('./user-model.js')

const router = require('express').Router();
const restricted = require("../auth/restricted-middleware.js");

router.get('/', restricted, async (req, res) => {
    const found = await Users.find()
    try {
        if (found) {
            res.status(200).json(found)
        } else {
            res.status(401).json('No Users')
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})



module.exports = router;