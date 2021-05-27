const controller = {}
const User = require("../models/user")

controller.registro = async (req, res) => {
    const email = req.body.email
    const password = req.body.password
    if (!email || !password) {
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
        const user = new User({ email: email, password: password })
        await user.save()
        const data = await User.findOne({ email: email })
        res.send({ status: "ok", data: data })
    } catch (err) {
        console.log(err)
        res.status(500).send("Error")
    }

}


module.exports = controller