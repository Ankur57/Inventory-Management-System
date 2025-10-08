const { validationResult } = require("express-validator")
const InventoryModel = require('../Models/inventory.model')


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



