const jwt = require('jsonwebtoken')
const router = require('express').Router()

const { SECRET } = require('../util/config')
const User = require('../models/user')

router.post('/', async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username
    }
  })

  const passwordCorrect = (req.body.password === user.password)

  if (!(user && passwordCorrect)) {
    return res.status(401).json({
      error: 'invalid username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  }

  const token = jwt.sign(userForToken, SECRET)

  res
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router