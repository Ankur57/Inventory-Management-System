import myBG from "../assets/Background3.jpg"

const HomeList = (props) => {
  return (
      <div
      style={{ backgroundImage: `url(${myBG})` }}
      className="w-screen h-screen bg-cover">
        <div className=" bg-red-50 h-[100%] w-[100%] overflow-auto ">
          <div
          className="flex justify-between mr-3 ml-2 w-[200%] lg:w-[100%]">
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

export default HomeList
