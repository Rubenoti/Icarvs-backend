const passport = require("passport")
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('../config')
const User = require('../models/user')
const Company = require('../models/company')

passport.use('auth', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub)
        if (!user) {
            return done(null, false)
        }
        done(null, user)
    } catch (error) {
        done(error, false)
    }
}))


passport.use('authCompany', new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.secret,
}, async (payload, done) => {
    try {
        const company = await Company.findById(payload.sub)
        if (!company) {
            return done(null, false)
        }
        done(null, company)
    } catch (error) {
        done(error, false)
    }
}))

const authCompany = passport.authenticate('authCompany', {
    session: false,
})

const auth = passport.authenticate('auth', {
    session: false,
})

module.exports = { auth }