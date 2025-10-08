import React from 'react'

const Category = (props) => {
  return (
    <div className='h-[100%] w-[100%] flex items-center justify-center relative '>
        <div className='h-[80%] w-[80%] md:w-[50%] flex flex-col items-center bg-stone-200 border-2
         overflow-auto border-black rounded-sm'>
            <div className='w-[100%] flex flex-col items-center'>
              <div className='flex justify-between w-[95%] items-center'>
                <h1 className='font-Playfair font-semibold text-2xl md:text-4xl '>Add Category
                </h1>
                <i 
                onClick= {(e)=>{props.handleCloseCategoryForm(false)}}
                className=" font-medium text-3xl ri-arrow-left-circle-line text-right mt-3"></i>
              </div>
                <div className="h-1 w-[150%] sm:w-[100%] bg-gray-500 mb-5 mt-2"></div>
            </div>
            <form            
            className='w-[90%] flex flex-col mt-5 gap-6'>
                <div className='flex flex-col'>
                  <h1 className ='text-xl font-semibold'>Enter Category Name</h1>
                  <input
                  type='text' placeholder='Enter Product Id' className='p-2 placeholder:italic ' ></input>
                </div>
                <div className='flex flex-col'>
                  <h1 className ='text-xl font-semibold'>Add Description</h1>
                  <input
                  type='text' placeholder='Description' className='p-2 placeholder:italic'></input>
                </div>
              <button type="submit" className='bg-sky-400 p-3 w-[50%] sm:w-[30%]
               rounded-lg sm:text-lg font-semibold mt-5 mb-5'>Add Category</button>
            </form>
            
        </div>
    </div>

  )
}

export default Category
