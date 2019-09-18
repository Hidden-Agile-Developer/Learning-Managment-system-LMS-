
const jwt = require("jsonwebtoken")
const Teach = require('../Model/teacherModel')

const authteach = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, 'thisismynewcourse')
        const teach = await Teach.findOne({ _id: decoded._id, 'tokens.token': token })

        if (!teach) {
            throw new Error()
        }

        req.token = token
        req.teach = teach
        next()
    } catch (e) {
        res.status(401).send({ error: 'Pleaseuthenticate.' })
    }
}

module.exports = authteach
