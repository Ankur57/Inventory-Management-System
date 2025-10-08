import { useState } from 'react';
import Category from './Category';

const Form = (props) => {
   const [productId, setProductId] = useState("");
    const [category, setCategory] = useState("");
    const [productName, setProductName] = useState("");
    const [costPrice, setCostPrice] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");

    const handleSubmit = (e)=>{
      e.preventDefault()


      const cost = parseFloat(costPrice);
      const selling = parseFloat(sellingPrice);
      const profit = (selling - cost) || 0;

      const newItem = {
            id: productId,//Can be generated automatically 
            category,
            product: productName,
            sellingPrice: selling,
            costPrice: cost,
            profit,
        };

        props.onAddItem(newItem);

        props.onClose();
        setProductId("");
        setCategory("");
        setProductName("");
        setCostPrice("");
        setSellingPrice("");
    }


  return (
    <div className='h-[100%] w-[100%] flex items-center justify-center relative '>
      {/*Desktop view*/}{/**/}
      {/*Mobile view*/}
        <div className='h-[80%] w-[80%] md:w-[50%] flex flex-col items-center bg-stone-200 border-2
         overflow-auto border-black rounded-sm'>
            <div className='w-[100%] flex flex-col items-center'>
              {/*Heading placeholder:italic */}
              <div className='flex justify-between w-[95%] items-center'>
                <h1 className='font-Playfair font-semibold text-2xl md:text-4xl '>Add Items
                </h1>
                <i 
                onClick={props.onClose}
                className=" font-medium text-3xl ri-arrow-left-circle-line text-right mt-3"></i>
              </div>
                <div className="h-1 w-[150%] sm:w-[100%] bg-gray-500 mb-5 mt-2"></div>
            </div>
            <form
            onSubmit={(e)=>{handleSubmit(e)}}
            className='w-[90%] flex flex-col mt-5 gap-6'>
              {/*Row-1*/}
                <div className='flex flex-col'>
                  <h1 className ='text-xl font-semibold'>Enter Product ID</h1>
                  <input
                  value={productId}
                  onChange= {(e)=>{setProductId(e.target.value)}}
                  type='text' placeholder='Enter Product Id'  className='p-2 placeholder:italic ' ></input>
                </div>
                <div className='flex flex-col  '>
                  <h1 className='text-xl font-semibold'>Select category</h1>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="border p-2 rounded w-[100%]"
                  >
                    <option value="">-- Select --</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Ring">Ring</option>
                   </select>
                   <button
                    onClick={() => props.setCategoryform(true)} 
                   type="button" className='rounded-lg bg-slate-400 text-black w-[13%] p-1 mt-1 opacity-80 text-sm '>Add</button>
              </div>
              
              {/*Row-2*/}
              
                <div className='flex flex-col'>
                  <h1 className=' text-xl font-semibold'>Select Product Name</h1>
                  <select
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    className="border p-2 rounded"
                  >
                    <option value="">-- Select --</option>
                    <option value="Ring">Ring</option>
                    <option value="Necklace">Necklace</option> 
                   </select>
                   <button type="button" className='rounded-lg bg-slate-400 text-black w-[13%] p-1 mt-1 opacity-80 text-sm '>Add</button>
                </div>
                <div className='flex flex-col'>
                  <h1 className=' text-xl font-semibold'>Enter Cost Price</h1>
                  <input
                  value={costPrice}
                  onChange={(e) => setCostPrice(e.target.value)}
                  type='number' placeholder='Cost Price'  className='p-2 placeholder:italic ' ></input>
                </div>
              
              {/*Row-3*/}
              
                <div className='flex flex-col'>
                  <h1 className='font- text-xl font-semibold'>Enter Selling Price</h1>
                  <input
                  value={sellingPrice}
                  onChange={(e) => setSellingPrice(e.target.value)}                  
                  type='number' placeholder='Selling Price'  className='p-2 placeholder:italic ' ></input>
                </div>
                <div className='flex flex-col'>
                  <h1 className='font- text-xl font-semibold'>Profit</h1>
                  <h1 className='font- text-xl font-semibold'>{(sellingPrice - costPrice) || 0}</h1>
                </div>             
              <button type="submit" className='bg-sky-400 p-3 w-[50%] sm:w-[30%] rounded-lg sm:text-xl font-semibold mt-5 mb-5'>Add Item</button>
            </form>
            
        </div>
    </div>
  )
}

export default Form
