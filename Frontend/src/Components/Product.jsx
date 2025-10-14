import { useState } from 'react';

const Product = (props) => {
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")

  const SumbitHandler = (e) =>{
    e.preventDefault();

    const Category = {
      name,
      description
    }
    props.handleAddProduct(Category)
    props.handleCloseProductForm()

    setname('');
    setdescription('');
  }

  
  return (
    <div className='h-[100%] w-[100%] flex items-center justify-center relative '>
        <div className='h-[80%] w-[80%] md:w-[50%] flex flex-col items-center bg-stone-200 border-2
         overflow-auto border-black rounded-sm'>
            <div className='w-[100%] flex flex-col items-center'>
              <div className='flex justify-between w-[95%] items-center'>
                <h1 className='font-Playfair font-semibold text-2xl md:text-4xl '>Add Product
                </h1>
                <i 
                onClick= {()=>{props.handleCloseProductForm(false)}}
                className=" font-medium text-3xl ri-arrow-left-circle-line text-right mt-3"></i>
              </div>
                <div className=" w-[150%] sm:w-[100%] bg-gray-500 mb-5 mt-2"></div>
            </div>
            <form 
            onSubmit={(e)=>{SumbitHandler(e)}}    
            className='w-[90%] flex flex-col mt-5 gap-6'>
                <div className='flex flex-col'>
                  <h1 className ='text-xl font-semibold'>Enter Product Name</h1>
                  <input
                  value={name}
                  onChange= {(e)=>{setname(e.target.value)}}
                  type='text' placeholder='Product Name' className='p-2 placeholder:italic ' ></input>
                </div>
                <div className='flex flex-col'>
                  <h1 className ='text-xl font-semibold'>Add Description</h1>
                  <input
                  value={description}
                  onChange= {(e)=>{setdescription(e.target.value)}}
                  type='text' placeholder='Description' className='p-2 placeholder:italic'></input>
                </div>
              <button type="submit" className='bg-sky-400 p-3 w-[50%] sm:w-[30%]
               rounded-lg sm:text-lg font-semibold mt-5 mb-5'>Add Product</button>
            </form>
            
        </div>
    </div>

  )
}

export default Product
