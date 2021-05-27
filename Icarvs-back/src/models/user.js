const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SchemaMongo = mongoose.Schema

const Schema = new SchemaMongo({
    email: { type: String, require: true, unique: true },
    pass: { type: String, require: true },
})

Schema.pre('save', async function (next) {
    try {
        const user = this
        const hash = bcrypt.hashSync(user.pass, bcrypt.genSaltSync(10))
        user.pass = hash
        next()
    } catch (error) {
        next(error)
    }
})

Schema.methods.isValidPassword = async function (pass) {
    const compare = await bcrypt.compare(pass, this.pass)
    return compare
}

module.exports = mongoose.model("users", Schema)