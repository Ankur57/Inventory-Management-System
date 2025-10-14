


const HomeList = (props) => {

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
            className="w-screen h-screen bg-cover overflow-hidden "
          >
            <div className=" bg-red-50 h-[100%] w-[98%] mx-auto my-3 p-2 flex flex-col">
      
              {/* Inventory List (Table Structure) */}
              <div className="overflow-x-auto flex-grow">
                <div role="table" className="w-[200%] sm:w-[100%] ">
                  
                  {/* Table Header Row */}
                  <div role="rowgroup" className="font-Playfair text-lg md:text-xl font-semibold bg-gray-200  top-0 border-b-2 border-gray-400">
                    <div role="row" className="flex">
                      {headers.map(header => (
                        <div 
                          key={header} 
                          role="columnheader" 
                          // Responsive sizing and truncation: 
                          // w-1/5 gives 20% width. Adjusted some for Action/ID.
                          // text-center for alignment.
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
                            className="ri-delete-bin-line text-red-600 cursor-pointer text-xl hover:scale-110"
                            title="Delete Item"
                          ></i>
                          <i
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

export default HomeList
