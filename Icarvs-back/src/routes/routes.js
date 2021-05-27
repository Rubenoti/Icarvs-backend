const express = require("express")
const router = express.Router()
const passport = require('../auth/auth')
const userController = require("../controllers/user")


router.post("/user", userController.registro)




module.exports = router