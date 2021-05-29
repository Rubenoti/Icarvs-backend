const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const SchemaMongo = mongoose.Schema

const Schema = new SchemaMongo({
    email: { type: String, require: true, unique: true },
    pass: { type: String, require: true },
})

Schema.pre('save', async function (next) {
    try {
        const company = this
        const hash = bcrypt.hashSync(company.pass, bcrypt.genSaltSync(10))
        company.pass = hash
        next()
    } catch (error) {
        next(error)
    }
})

Schema.methods.isValidPassword = async function (pass) {
    const compare = await bcrypt.compare(pass, this.pass)
    return compare
}

module.exports = mongoose.model("companys", Schema)