const bcrypt = require('bcrypt')

const hashPasswordSync = (plainTextPassword) => {
    return bcrypt.hashSync(plainTextPassword, 10)
}

const comparePassword = async (plainTextPassword, hashPassword, done) => {
    await bcrypt.compare(plainTextPassword, hashPassword, done)
}

module.exports = { hashPasswordSync, comparePassword}