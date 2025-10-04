const express = require('express')
const router = express.Router()
const controller = require('../Controller/controller')
const {body} = require('express-validator')


router.post('/register',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('fullname.firstname').isLength({min:2}).withMessage('Invalid FirstName'),
    body('password').isLength({min:6}).withMessage
    ("Password should be of minimum 6 length"),
    body('code').isLength({min:4}).withMessage
    ("Password should be of minimum 4 length")
],
    controller.registerUser
)
router.post('/login',[
    body('email').isEmail().withMessage('Invalid Email'),
    body('password').isLength({min:6}).withMessage
    ("Password should be of minimum 6 length")
],
    controller.loginUser
)

router.post(
  '/inventory',
  [
    body('id').notEmpty().withMessage('ID is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('product').notEmpty().withMessage('Product is required'),
    body('sellingPrice').isNumeric().withMessage('Selling Price must be a number'),
    body('costPrice').isNumeric().withMessage('Cost Price must be a number'),
    body('profit').isNumeric().withMessage('Profit must be a number'),
  ],
  controller.inventory
);

module.exports = router;