import myBG from "../assets/Background3.jpg"

const List = (props) => {
// Note: The search/filter logic is handled by the parent component (Inventory.jsx)
// and passed into props.inventoryList.

  const submithandler = (item) => {
    const product = {
      id: item.id,
      product: item.product,
      category: item.category,
      sellingPrice: item.sellingPrice,
      profit: item.profit
    }
    props.handleSales(product);
    props.handleDeleteItem(item._id,item.category,item.product);
  }

  // Define headers for the table
  const headers = [
    "Product ID",
    "Category",
    "Product",
    "Selling Price",
    "Cost Price",
    "Profit",
    "Action"
  ];

  return (
    <div
      style={{ backgroundImage: `url(${myBG})` }}
      className="w-screen h-screen bg-cover overflow-hidden"
    >
      <div className="border-2 rounded-xl border-black bg-red-50 h-[100%] w-[98%] mx-auto my-3 p-2 flex flex-col">
        
        {/* Header and Add Item Button */}
        <div className="flex justify-between items-center mr-4 mt-2 mb-4">
          <h1 className="font-Playfair text-2xl md:text-4xl p-2 font-semibold">Your Inventory</h1>
          <button
            onClick={() => props.setform(true)}
            className="bg-sky-200 font-semibold text-black text-sm sm:text-lg md:text-xl rounded-lg
              w-[30%] sm:w-[20%] p-2 md:p-4 transition duration-150 ease-in-out hover:bg-sky-300"
          >
            Add Item
          </button>
        </div>
        
        {/* --- NEW ADDITION: Responsive Search Bar --- */}
        <div className="mb-4 p-2">
            <div className="w-full max-w-xl mx-auto md:max-w-none md:mx-0">
                <input
                    type="text"
                    placeholder="Search by Product ID..."
                    onChange={(e) => props.setonSearchChange(e.target.value)}
                    value={props.onSearchChange} 
                    className="w-full p-2 pl-10 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-sky-500 transition duration-150 ease-in-out text-sm md:text-base"
                />
            </div>
        </div>
        {/* ------------------------------------------- */} 
        
        <div className="h-0.5 w-full bg-gray-500 mb-4"></div>

        {/* Inventory List (Table Structure) */}
        <div className="overflow-x-auto flex-grow">
          <div role="table" className="w-[200%] sm:w-[100%] ">
            
            {/* Table Header Row */}
            <div role="rowgroup" className="font-Playfair text-lg md:text-xl font-semibold bg-gray-200  top-0 border-b-2 border-gray-400">
              <div role="row" className="flex">
                {headers.map(header => (
                  <div 
                    key={header} 
                    role="columnheader" 
                    className={`p-2 text-center border-r last:border-r-0 border-gray-300 
                      ${header === 'Action' ? 'w-[12%]' : header === 'Product ID' ? 'w-[12%]' : 'flex-1'}
                      truncate`}
                  >
                    {header}
                  </div>
                ))}
              </div>
            </div>

            {/* Table Body - Inventory Rows */}
            <div role="rowgroup" className="text-sm md:text-base font-medium">
              {props.inventoryList.map(item => (
                <div 
                  key={item._id} 
                  role="row" 
                  className="flex items-center hover:bg-red-100 transition duration-150 ease-in-out border-b border-gray-300"
                >
                  
                  {/* Product ID */}
                  <div role="cell" className="p-2 text-center w-[12%] border-r border-gray-300 truncate">
                    {item.id}
                  </div>
                  
                  {/* Category */}
                  <div role="cell" className="p-2 text-center flex-1 border-r border-gray-300 truncate">
                    {item.category}
                  </div>
                  
                  {/* Product Name */}
                  <div role="cell" className="p-2 text-center flex-1 border-r border-gray-300 truncate">
                    {item.product}
                  </div>
                  
                  {/* Selling Price */}
                  <div role="cell" className="p-2 text-center flex-1 border-r border-gray-300 truncate">
                    ₹{item.sellingPrice}
                  </div>

                  {/* Cost Price */}
                  <div role="cell" className="p-2 text-center flex-1 border-r border-gray-300 truncate">
                    ₹{item.costPrice}
                  </div>
                  
                  {/* Profit */}
                  <div role="cell" className="p-2 text-center flex-1 border-r border-gray-300 truncate">
                    ₹{item.profit}
                  </div>
                  
                  {/* Action */}
                  <div role="cell" className="p-2 text-center w-[12%] flex justify-around">
                    <i
                      onClick={() => props.handleDeleteItem(item._id,item.category,item.product)}
                      className="ri-delete-bin-line text-red-600 cursor-pointer text-xl hover:scale-110"
                      title="Delete Item"
                    ></i>
                    <i
                      onClick={() => submithandler(item)}
                      className="ri-checkbox-line text-green-600 cursor-pointer text-xl hover:scale-110"
                      title="Mark as Sold"
                    ></i>
                  </div>
                  
                </div>
              ))}
              {props.inventoryList.length === 0 && (
                <div className="p-4 text-center text-gray-500">
                  No items in inventory. Add a new item to get started!
                </div>
              )}
            </div>
            
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default List