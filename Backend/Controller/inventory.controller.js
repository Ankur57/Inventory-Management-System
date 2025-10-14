const { validationResult } = require("express-validator")
const InventoryModel = require('../Models/inventory.model')
const ProductModel = require('../Models/product.model')
const CategoryModel = require('../Models/category.model')
const SalesModel = require('../Models/sales.model')
const SourceModel = require('../Models/source.model')


module.exports.inventory = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
    try{
    const {id,category,product,sellingPrice,costPrice,profit} = req.body;

    const isProductAlready = await InventoryModel.findOne({
            id
        })
    if(isProductAlready){
            return res.status(400).json({message : "Product Already Registered"})
        }
    if(!profit){
      throw new Error("Profit is zero");
    }
    if(!id || !category || !product || !sellingPrice || !costPrice || !profit){
            throw new Error("All fields are required ");
        }
    const inventory = await InventoryModel.create({
            id,
            category,
            product,
            sellingPrice,
            costPrice,
            profit
         })    
    console.log("Item Added");
    res.status(201).json({inventory})
    }catch(err) {
        console.log(err);
        res.status(500).json({ message:"server error from inventory"});
    }
}
module.exports.updateQuantity = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
  try {
    const { name } = req.body; // product name passed from frontend

    const product = await ProductModel.findOne({ name });

    // 2️⃣ If not found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 3️⃣ Safely increment its quantity
    console.log("Iside updateQuantity")
    // ✅ find product by name and increment quantity by 1
    const updatedProduct = await ProductModel.findOneAndUpdate(
      
      { name },
      { $inc: { quantity: 1 } },
      { new: true } // return updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Quantity updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Internal server error from updateQuantity " });
  }
}

module.exports.DecreaseProductQuantity = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
  try {
    const { name } = req.body; // product name passed from frontend

    const product = await ProductModel.findOne({ name });

    // 2️⃣ If not found
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 3️⃣ Safely increment its quantity
    console.log("Iside updateQuantity")
    // ✅ find product by name and increment quantity by 1
    const updatedProduct = await ProductModel.findOneAndUpdate(
      
      { name },
      { $inc: { quantity: -1 } },
      { new: true } // return updated document
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Quantity updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Internal server error from updateQuantity " });
  }
}

module.exports.updateCategoryQuantity = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
  try {
    const { name } = req.body; // product name passed from frontend

    const Category = await CategoryModel.findOne({ name });

    // 2️⃣ If not found
    if (!Category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ find product by name and increment quantity by 1
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      
      { name },
      { $inc: { quantity: 1 } },
      { new: true } // return updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Quantity of Category updated successfully",
      Category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating Category quantity:", error);
    res.status(500).json({ message: "Internal server error from Category updateQuantity " });
  }
}

module.exports.DecreaseCategoryQuantity = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
  try {
    const { name } = req.body; // product name passed from frontend

    const Category = await CategoryModel.findOne({ name });

    // 2️⃣ If not found
    if (!Category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // ✅ find product by name and increment quantity by 1
    const updatedCategory = await CategoryModel.findOneAndUpdate(
      
      { name },
      { $inc: { quantity: -1 } },
      { new: true } // return updated document
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.status(200).json({
      message: "Quantity of Category updated successfully",
      Category: updatedCategory,
    });
  } catch (error) {
    console.error("Error updating Category quantity:", error);
    res.status(500).json({ message: "Internal server error from Category updateQuantity " });
  }
}

module.exports.AddCategory = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
    try{
    const {name,description} = req.body;

    const isProductAlready = await CategoryModel.findOne({
            name
        })
    if(isProductAlready){
            return res.status(400).json({message : "Category Already Registered"})
        }
    if(!name){
            throw new Error("All fields are required ");
        }
    const Category = await CategoryModel.create({
           name,
           description
         })
    
    console.log("Item Added");
    res.status(201).json({Category})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message:"server error"});
    }
}

module.exports.AddProduct = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
    try{
    const {name,description} = req.body;

    const isProductAlready = await ProductModel.findOne({
            name
        })
    if(isProductAlready){
            return res.status(400).json({message : "Product Already Registered"})
        }
    if(!name){
            throw new Error("All fields are required ");
        }
    const Product = await ProductModel.create({
           name,
           description
         })
    
    console.log("Item Added");
    res.status(201).json({Product})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message:"server error"});
    }
}

module.exports.AddSource = async(req,res,next)=>{
    const errors = validationResult(req);
    console.log("Inside Add Source............................")
    console.log(req.body)
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
    try{
    const {name,sales,description} = req.body;

    const updatedSource = await SourceModel.findOneAndUpdate(
    // Query: Find a document where the name matches the one from the request body
    { name: name },
    // Update: Use $inc to increment the 'sales' field by the provided amount
    {
        $inc: { sales: sales },
        // $setOnInsert is used to set the description ONLY if a new document is created
        $setOnInsert: { description: description }
    },
    // Options: THIS IS WHERE THE MAGIC HAPPENS
    {
        new: true,
        // *** 1. If not found, a new document is created ***
        upsert: true, 
        runValidators: true,
        // *** 2. The default value of 'sales' (0) is respected on creation ***
        setDefaultsOnInsert: true 
    }
);

    
    console.log("Source Added");
    res.status(201).json({updatedSource})
    } catch(err) {
        console.log(err);
        res.status(500).json({ message:"server error"});
    }
}



module.exports.getInventory = async (req, res) => {
  try {
    const items = await InventoryModel.find();//This is going to return all the data present in the DB
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error });
  }
};


module.exports.getProduct = async (req, res) => {
  try {
    const items = await ProductModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Product inventory", error });
  }
};

module.exports.getSource = async (req, res) => {
  try {
    const items = await SourceModel.find();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Product inventory", error });
  }
};

module.exports.getCategory = async (req, res) => {
  try {
    const items = await CategoryModel.find();//This is going to return all the data present in the DB
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Error fetching Product inventory", error });
  }
};

// DELETE /inventory/:id
module.exports.deleteInventory = async (req, res) => {
  try {
    const id = req.params.id; // get item id from URL
    console.log(id)
    const deletedItem = await InventoryModel.findByIdAndDelete(id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    res.status(500).json({ message: "Error deleting item", error });
  }
};

module.exports.sales = async(req,res,next)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            errors : errors.array()
        });
    }
    try{
    const {id,category,product,sellingPrice,profit} = req.body;

    if(!id || !category || !product || !sellingPrice || !profit){
            throw new Error("All fields are required ");
        }
    const Sales = await SalesModel.create({
            id, // Added 'id' here, as it was in the request body but missing in the create
            product,
            category,            
            sellingPrice,
            profit

         })
    
    console.log("Item Sold");
    res.status(201).json({Sales})
    }catch(err) {
        console.log(err);
        res.status(500).json({ message:"server error"});
    }
}

module.exports.salesData = async(req,res,next)=>{
    try{
    const salesData = await SalesModel.aggregate([
            // 1. $addFields: Convert the string fields to double-precision floating-point numbers
            {
                $addFields: {
                    numericSellingPrice: { 
                        $toDouble: { $ifNull: ["$sellingPrice", "0"] } // Handle null/missing by defaulting to "0"
                    },
                    numericProfit: { 
                        $toDouble: { $ifNull: ["$profit", "0"] }      // Handle null/missing by defaulting to "0"
                    }
                }
            },
            // 2. $group: Group all sales documents by year and month
            {
                $group: {
                    // Define the new document's ID (the grouping key)
                    _id: {
                        year: { $year: '$createdAt' },
                        month: { $month: '$createdAt' } // Returns 1 (Jan) to 12 (Dec)
                    },
                    // Sum the newly created numeric fields
                    totalSales: { $sum: '$numericSellingPrice' },
                    totalProfit: { $sum: '$numericProfit' },
                    // Count the number of sales
                    count: { $sum: 1 } 
                }
            },
            // 3. $sort: Order the results chronologically
            {
                $sort: {
                    '_id.year': 1, 
                    '_id.month': 1 
                }
            },
            // 4. $project: Reshape and translate the month number to a month name string
            {
                $project: {
                    _id: 0, 
                    year: '$_id.year',
                    // CRITICAL FIX: Use $switch to map number (1-12) to month name string
                    month: {
                        $switch: {
                            branches: [
                                { case: { $eq: ['$_id.month', 1] }, then: 'Jan' },
                                { case: { $eq: ['$_id.month', 2] }, then: 'Feb' },
                                { case: { $eq: ['$_id.month', 3] }, then: 'Mar' },
                                { case: { $eq: ['$_id.month', 4] }, then: 'Apr' },
                                { case: { $eq: ['$_id.month', 5] }, then: 'May' },
                                { case: { $eq: ['$_id.month', 6] }, then: 'Jun' },
                                { case: { $eq: ['$_id.month', 7] }, then: 'Jul' },
                                { case: { $eq: ['$_id.month', 8] }, then: 'Aug' },
                                { case: { $eq: ['$_id.month', 9] }, then: 'Sep' },
                                { case: { $eq: ['$_id.month', 10] }, then: 'Oct' },
                                { case: { $eq: ['$_id.month', 11] }, then: 'Nov' },
                                { case: { $eq: ['$_id.month', 12] }, then: 'Dec' }
                            ],
                            default: 'Unknown'
                        }
                    },
                    totalSales: 1,
                    totalProfit: 1,
                    count: 1
                }
            }
        ]);
        res.json(salesData);

    } catch (error) {
        console.error('Error fetching sales per month data:', error.message);
        res.status(500).json({ message: 'Failed to retrieve sales data.' });
    }
}

// Function to calculate and return the total lifetime profit
module.exports.getTotalProfit = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: null, // Group all documents together
                    totalProfit: {
                        // Convert the string field to an integer for correct summation
                        $sum: { $toInt: "$profit" } 
                    }
                }
            },
            {
                // Clean up the output document
                $project: {
                    _id: 0,
                    totalProfit: 1
                }
            }
        ]);

        // Extract the value, default to 0 if no sales exist
        const overallProfit = result.length > 0 ? result[0].totalProfit : 0;
        
        res.status(200).json({ totalProfit: overallProfit });
    } catch (error) {
        console.error("Error calculating total profit:", error);
        res.status(500).json({ message: "Failed to calculate total profit" });
    }
};



// Function to calculate and return the total lifetime revenue (total selling price)
module.exports.getTotalRevenue = async (req, res) => {
    try {
        const result = await SalesModel.aggregate([
            {
                $group: {
                    _id: null, // Group all documents together
                    totalRevenue: {
                        // Convert the string field to an integer for correct summation
                        $sum: { $toInt: "$sellingPrice" } 
                    }
                }
            },
            {
                // Clean up the output document
                $project: {
                    _id: 0,
                    totalRevenue: 1
                }
            }
        ]);

        // Extract the value, default to 0 if no sales exist
        const overallRevenue = result.length > 0 ? result[0].totalRevenue : 0;
        
        res.status(200).json({ totalRevenue: overallRevenue });
    } catch (error) {
        console.error("Error calculating total revenue:", error);
        res.status(500).json({ message: "Failed to calculate total revenue" });
    }
};