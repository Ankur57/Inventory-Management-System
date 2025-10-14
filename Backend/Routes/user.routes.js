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
router.post(
  '/AddCategory',
  [
    body('name').notEmpty().withMessage('Category is required'),
  ],
  inventory.AddCategory
);

router.post(
  '/AddProduct',
  [
    body('name').notEmpty().withMessage('Product is required'),
  ],
  inventory.AddProduct
);
router.post(
  '/AddSource',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('sales').notEmpty().withMessage('Sales is required')
  ],
  inventory.AddSource
);

router.post('/logout', authmiddleware.authUser, (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    sameSite: 'none', // 'lax' if both on localhost
    secure: false,    // true only in production (HTTPS)
  });
  return res.status(200).json({ message: "Logged out successfully" });
});

router.post(
  '/sales',
  [
    body('id').notEmpty().withMessage('ID is required'),
    body('product').notEmpty().withMessage('Product is required'),
    body('category').notEmpty().withMessage('Category is required'),
    body('sellingPrice').isNumeric().withMessage('Selling Price must be a number'),
    body('profit').isNumeric().withMessage('Profit must be a number'),
  ],
  inventory.sales
);

// PUT /user/updateQuantity
router.put('/updateQuantity',
  [
    body('name').notEmpty().withMessage('Name is required'),
   
  ],
  inventory.updateQuantity
);

// Route for total profit (existing)
router.get('/totalprofit', inventory.getTotalProfit); 

// New route for fetching total revenue
router.get('/totalrevenue', inventory.getTotalRevenue);

router.put('/updateCategoryQuantity',
  [
    body('name').notEmpty().withMessage('Name is required'),
   
  ],
  inventory.updateCategoryQuantity
);

router.put('/DecreaseProductQuantity',
  [
    body('name').notEmpty().withMessage('Name is required'),
   
  ],
  inventory.DecreaseProductQuantity
);

router.put('/DecreaseCategoryQuantity',
  [
    body('name').notEmpty().withMessage('Name is required'),
   
  ],
  inventory.DecreaseCategoryQuantity
);

// Get all inventory items
router.get('/inventory', authmiddleware.authUser, inventory.getInventory);
router.get('/product', authmiddleware.authUser, inventory.getProduct);
router.get('/source', authmiddleware.authUser, inventory.getSource);
router.get('/category', authmiddleware.authUser, inventory.getCategory);
router.delete('/inventory/:id', inventory.deleteInventory);
router.get('/profile',authmiddleware.authUser,controller.getUserProfile);
router.get('/sales-per-month',inventory.salesData);

module.exports = router;