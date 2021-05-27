const mongoose = require("mongoose")
const password = "icarvsPass"
const dbname = "icarvs"
const user = "Icarvs"
const host = "cluster0.grpbn.mongodb.net"

const uri = `mongodb+srv://${user}:${password}@${host}/${dbname}?retryWrites=true&w=majority`

module.exports = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })


