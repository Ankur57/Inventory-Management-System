const express = require('express')
const router = express.Router()
const controller = require('../Controller/controller')
const {body} = require('express-validator')
const inventory = require('../Controller/inventory.controller')
const authmiddleware = require('../Middleware/auth.middleware')


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
  inventory.inventory
);

router.post('/logout', authmiddleware.authUser, (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none', // 'lax' if both on localhost
    secure: false,    // true only in production (HTTPS)
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

// Get all inventory items
router.get('/inventory', authmiddleware.authUser, inventory.getInventory);
router.delete('/inventory/:id',authmiddleware.authUser, inventory.deleteInventory);
router.get('/profile',authmiddleware.authUser,controller.getUserProfile)



module.exports = router;