import myBG from "../assets/Background3.jpg"

const List = (props) => { 

  return (
    <div
    style={{ backgroundImage: `url(${myBG})` }}
    className="w-screen h-screen bg-cover">
      <div className=" border-2 rounded-xl border-black bg-red-50 h-[100%] w-[98%] ml-3 overflow-auto ">
        <div className="flex justify-between mr-4 mt-2">
        <h1 className="font-Playfair text-2xl md:text-4xl p-2 font-semibold">Your Inventory</h1>
        <button
        onClick={() => props.setform(true)}
        className="bg-sky-200 font-semibold text-black sm:text-lg md:text-xl rounded-lg
         w-[30%] sm:w-[20%] p-4">Add Item</button>
        </div>
        <div className="h-1 w-[200%] sm:w-[100%] bg-gray-500 mb-2 mt-2"></div>
        <div
        className="flex justify-between mr-3 ml-2 w-[200%] sm:w-[95%]">
            {/*Product ID*/}
          <div className="flex flex-col gap-2">
            <h2 className="font-Playfair text-xl font-semibold">Product ID</h2>
            {props.inventoryList.map(item => (
                <h3 key={item.id + "Product ID"} className="font-Playfair text-xl text-center font-medium">
                  {item.id}
                </h3>
              ))}
          </div>
          {/*Category*/}
          <div className="flex flex-col gap-2">
            <h2 className="font-Playfair text-xl font-semibold ">Category</h2>
            {props.inventoryList.map(item => (
                <h3 key={item.id + "Category"} className="font-Playfair text-xl text-center font-medium">
                  {item.category}
                </h3>
              ))} 
          {/*Product name*/}
          </div>
          {/*Product Name*/}
            <div className="flex flex-col gap-2">
            <h2 className="font-Playfair text-xl font-semibold ">Product</h2>
            {props.inventoryList.map(item => (
                <h3 key={item.id + "Product"} className="font-Playfair text-xl text-center font-medium">
                  {item.product}
                </h3>
              ))}
          </div>
          {/*Price*/}
          <div className="flex flex-col gap-2">
            <h2 className="font-Playfair text-xl font-semibold ">Selling Price</h2>
            {props.inventoryList.map(item => (
                <h3 key={item.id + "Selling Price"} className="text-xl">
                  ₹<span className="text-xl text-center font-medium">{item.sellingPrice}</span>
                </h3>
              ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-Playfair text-xl font-semibold ">Cost Price</h2>
            {props.inventoryList.map(item => (
                <h3 key={item.id + "Cost Price"} className="text-xl">
                  ₹<span className="text-xl text-center font-medium">{item.costPrice}</span>
                </h3>
              ))}
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="font-Playfair text-xl font-semibold ">Profit</h2>
            {props.inventoryList.map(item => (
                <h3  key={item.id + "Profit"} className="text-xl">
                  ₹<span className="text-xl text-center font-medium">{item.profit}</span>
                </h3>
              ))}
          </div>
          {/*Action*/}
          <div className="flex flex-col gap-2">
            <h2 className="font-Playfair text-xl font-semibold ">Action</h2>
            {props.inventoryList.map(item => (
                <button 
                  key={item.id + "Action"} 
                  className="font-Playfair text-xl text-center font-medium ">
                  <span><i
                  onClick={() => props.handleDeleteItem(item._id)}
                  className="ri-delete-bin-line text-red-600"></i></span>
                </button>
              ))}
          </div>
          </div>
      </div>
    </div>
  )
}

export default List
