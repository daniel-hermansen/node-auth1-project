const router = require('express').Router();
const Users = require('../users/user-model.js');
const bcrypt = require('bcryptjs');

router.post('/Register', async (req, res) => {
    const login = req.body
    const hash = await bcrypt.hashSync(login.password, 12)
    login.password = await hash
    try {
        const newLogin = await Users.addUser(login)

        if (newLogin) {
            res.status(201).json('Registration successful')

        } else {
            res.status(404).json('Please provide valid username and password')
        }
    }
    catch{
        res.status(500).json('Error with Database')
    }
})

router.post('/Login', async (req, res) => {
    let { username, password } = req.body

    try {
        const user = await Users.findBy({ username }).first()

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;
            res.status(200).json({ message: `Welcome ${user.username}` })
        } else {
            res.status(401).json({ message: 'Username or password incorrect' })
        }
    }
    catch (error) {
        res.status(500).json(error)
    }
})

router.delete('/Logout', (req, res) => {
    if (req.session) {
        req.session.destroy((error) => {
            if (error) {
                res.status(400).json({ message: 'There has been an error.' })
            } else {
                res.json({ message: 'Successfully logged out.' })
            }
        })
    } else {
        res.end()
    }
})

module.exports = router;