const express = require("express")
const router = express.Router()
const passport = require('../auth/auth')
const userController = require("../controllers/user")
const companyController = require("../controllers/company")




router.post("/user", userController.registro)
router.post("/login", userController.login)

router.put("/data", passport.auth, userController.guardarDatos)
router.get("/data", passport.auth, userController.getUser)

router.post("/company", companyController.registroEmpresa)
router.post("/loginCompany", companyController.loginEmpresa)


module.exports = router