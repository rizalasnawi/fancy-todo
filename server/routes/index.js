const router = require('express').Router();
const userRouter = require('./user')
const todoRouter = require('./todo')
const {AuthorizationController} = require('../controller')


router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/register', AuthorizationController.register)
router.post('/login', AuthorizationController.login)
router.post('/signin/google',AuthorizationController.signInGoogle)
router.use('/todo', todoRouter)
router.use('/user', userRouter);


module.exports = router;