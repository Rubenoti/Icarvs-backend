const controller = {}
const Company = require("../models/company")
const authJWT = require("../auth/jwt")

controller.registroEmpresa = async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass
    if (!email || !pass) {
        res.status(400).send()
        return
    }
    try {
        const exists = await Company.findOne({ email: email })
        if (exists) {
            console.log("usuario ya existe")
            res.status(400).send("usuario ya existe")
            return
        }
        const company = new Company({ email: email, pass: pass })
        await company.save()
        const data = await Company.findOne({ email: email })
        res.send({ status: "ok", data: data })
    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }

}

controller.loginEmpresa = async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass

    if (!email || !pass) {
        console.log("datos obligatorios")
        res.status(401).send("Credenciales incorrectas")
        return
    }

    try {
        const company = await Company.findOne({ email: email })

        if (!company) {
            console.log("usuario no existe")
            res.status(401).send("Credenciales incorrectas")
            return
        }

        const validate = await company.isValidPassword(pass)
        if (!validate) {
            console.log("contraseña incorrecta")
            res.status(401).send("Credenciales incorrectas")
            return
        }

        const dataToken = authJWT.createToken(company)

        return res.send({
            access_token: dataToken[0],
            expires_in: dataToken[1]
        })

    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }
}




module.exports = controller