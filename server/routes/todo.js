const router = require('express').Router();
const {checkUserLogin} = require('../middleware')
const {TodoController} = require('../controller/')

router.get('/', checkUserLogin, TodoController)
router.post('/', checkUserLogin,  TodoController.create)
router.put('/:id', checkUserLogin, TodoController.update)
router.delete('/:id', checkUserLogin, TodoController.delete)

module.exports = router;