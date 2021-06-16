const controller = {}
const User = require("../models/user")
const authJWT = require("../auth/jwt")

controller.registro = async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass
    if (!email || !pass) {
        res.status(400).send()
        return
    }
    try {
        const exists = await User.findOne({ email: email })
        if (exists) {
            console.log("usuario ya existe")
            res.status(400).send("usuario ya existe")
            return
        }
        const user = new User({ email: email, pass: pass })
        await user.save()
        const data = await User.findOne({ email: email })
        const dataToken = authJWT.createToken(user)

        return res.send({
            access_token: dataToken[0],
            expires_in: dataToken[1]
        })
    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }


}

controller.login = async (req, res) => {
    const email = req.body.email
    const pass = req.body.pass

    if (!email || !pass) {
        console.log("datos obligatorios")
        res.status(401).send("Credenciales incorrectas")
        return
    }

    try {
        const user = await User.findOne({ email: email })

        if (!user) {
            console.log("usuario no existe")
            res.status(401).send("Credenciales incorrectas")
            return
        }

        const validate = await user.isValidPassword(pass)
        if (!validate) {
            console.log("contraseña incorrecta")
            res.status(401).send("Credenciales incorrectas")
            return
        }

        const dataToken = authJWT.createToken(user)

        return res.send({
            access_token: dataToken[0],
            expires_in: dataToken[1]
        })

    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }
}

controller.guardarDatos = async (req, res) => {
    const id = req.user.id
    const ciudad = req.body.ciudad
    const provincia = req.body.provincia
    const codigoPostal = req.body.codigoPostal
    const calle = req.body.calle
    const numero = req.body.numero
    const puerta = req.body.puerta
    const tiempo = req.body.tiempo
    const donde = req.body.donde
    const hayElectricidad = req.body.hayElectricidad

    if (!ciudad || !provincia || !codigoPostal || !calle || !numero || !puerta || !tiempo || !donde || !hayElectricidad) {
        console.log("Datos obligatorios")
        res.status(400).send("Faltan datos")
        return
    }
    try {
        await User.findByIdAndUpdate(id,
            { ciudad: ciudad, provincia: provincia, codigoPostal: codigoPostal, calle: calle, numero: numero, puerta: puerta, tiempo: tiempo, donde: donde, hayElectricidad: hayElectricidad })

        res.status(201).send()
    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }
}

controller.getUser = async (req, res) => {
    const id = req.user.id

    try {
        const user = await User.findById(id)
        res.json(user)
    } catch (err) {
        console.log(err)
        res.status(500).send({ error: "El perfil no existe" })
    }
}



module.exports = controller