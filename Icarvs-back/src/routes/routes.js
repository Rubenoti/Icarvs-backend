const express = require("express")
const router = express.Router()
const passport = require('../auth/auth')
const userController = require("../controllers/user")


router.post("/user", userController.signup)




module.exports = router