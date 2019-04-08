const {Todo} = require('../models')

class TodoController {
    
    static find(req, res) {
        Todo.find({user: req.user._id})
            .then(data => {
                res.json({data})
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static create(req, res) {
        let {name, description, due_date} = req.body
        let user = req.user._id
        let input = {name, description, due_date, user}
        Todo.create(input)
            .then(data => {
                res.status(201).json({data})
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    }

    static update(req, res) {
        let _id = req.params.id
        let {name, description, status, due_date} = req.body
        let user = req.user._id
        let input = {name, description, status, due_date, user}
        Todo.findOneAndUpdate({_id}, input)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static delete(req, res) {
        let _id = req.params.id
        let user = req.user._id
        Todo.findOneAndDelete({_id, user})
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoController