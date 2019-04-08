const {User} = require('../models')
const jwt = require('jsonwebtoken')
const {OAuth2Client} =require('google-auth-library')
const {checkHash} = require('../helpers')

let clientId = '243511392288-cv0kqj868gpduema1g9ajv303t61up5q.apps.googleusercontent.com'
const client = new OAuth2Client(clientId)

class AuthorizationController {

    static register(req, res) { 
        let {username, email, password} = req.body
        User.create({username, email, password})
            .then(user => {
                res.status(201).json(user)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static login(req, res) {
        let {email, password} = req.body
        User.findOne({email})
            .then(user => {
                let {_id, email} = user
                if(checkHash(password, user.password)) {
                    let token = jwt.sign({_id, email}, process.env.JWT_SECRET)
                    res.status(200).json(token)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static signInGoogle(req, res) {
        let tempName ,tempEmail = ''
        let {id_token} = req.body

        client.verifyIdToken({
            idToken: id_token,
            audience: clientId
        })
            .then(ticket => {
                const payload = ticket.getPayload()
                const {email, name} = payload
                tempName = name
                tempEmail = email
                return User.findOne({email})
            })
            .then(user => {
                if(user) {
                    let {_id, email} = user
                    let token = jwt.sign({_id, email}, process.env.JWT_SECRET)
                    res.json(token)
                } else {
                    User.create({email: tempEmail, username: tempName})
                    .then(response => {
                        let {_id, email} = response
                        let token = jwt.sign({_id, email}, process.env.JWT_SECRET)
                        res.status(201).json(token)
                    })
                    .catch(err => {
                        res.status(500).json(err)
                    })
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = AuthorizationController