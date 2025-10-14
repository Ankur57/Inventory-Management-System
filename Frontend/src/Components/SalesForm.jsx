import { useState } from "react"
import { useContext } from "react";
import {SourceContext} from '../Context/SourceContext'

const SalesForm = (props) => {
  const [name, setname] = useState("")
  const [description, setdescription] = useState("")
  const [sales, setSales] = useState("");
   const {SourceList,setSourceList} = useContext(SourceContext)
  
    const SumbitHandler = (e) =>{
      e.preventDefault();
  
      const Source = {
        name,
        sales,
        description
      }
      console.log("Inside Sales Form------------------------------------------")
      console.log(Source);
      console.log(SourceList)
      props.handleAddSource(Source)
      props.handleCloseSalesForm()
  
      setname('');
      setdescription('');
      setSales("")
    }
  
    
    return (
      <div className='h-[100%] w-[100%] flex items-center justify-center relative '>
          <div className='h-[80%] w-[80%] md:w-[50%] flex flex-col items-center bg-stone-200 border-2
           overflow-auto border-black rounded-sm'>
              <div className='w-[100%] flex flex-col items-center'>
                <div className='flex justify-between w-[95%] items-center'>
                  <h1 className='font-Playfair font-semibold text-2xl md:text-4xl '>Add Source
                  </h1>
                  <i 
                  onClick= {()=>{props.handleCloseSalesForm(false)}}
                  className=" font-medium text-3xl ri-arrow-left-circle-line text-right mt-3"></i>
                </div>
                  <div className="h-1 w-[150%] sm:w-[100%] bg-gray-500 mb-5 mt-2"></div>
              </div>
              <form 
              onSubmit={(e)=>{SumbitHandler(e)}}    
              className='w-[90%] flex flex-col mt-5 gap-6'>
                  <div className='flex flex-col'>
                    <h1 className ='text-xl font-semibold'>Enter Source Name</h1>
                    <select
                    value={name}
                    onChange= {(e)=>{setname(e.target.value)}}
                    className='p-2 placeholder:italic ' >
                      <option value="">-- Select --</option>
                      {SourceList
                        // Add this .filter() to remove any null or undefined items
                        .filter(item => item && item.name)
                        .map(item => (
                          <option key={item._id} value={item.name}>
                            {item.name}
                          </option>
                      ))} 
                   </select>
                   <button
                   onClick={() => props.setSourceform(true)}
                   type="button" className='rounded-lg bg-slate-400 text-black w-[13%] p-1 mt-1 opacity-80 text-sm '>Add</button>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className ='text-xl font-semibold'>Add Sales</h1>
                    <input
                    value={sales}
                    onChange= {(e)=>{setSales(e.target.value)}}
                    type='text' placeholder='Sales' className='p-2 placeholder:italic'></input>
                  </div>
                  <div className='flex flex-col'>
                    <h1 className ='text-xl font-semibold'>Add Description</h1>
                    <input
                    value={description}
                    onChange= {(e)=>{setdescription(e.target.value)}}
                    type='text' placeholder='Description' className='p-2 placeholder:italic'></input>
                  </div>
                <button type="submit" className='bg-sky-400 p-3 w-[50%] sm:w-[30%]
                 rounded-lg sm:text-lg font-semibold mt-5 mb-5'>Add Sales</button>
              </form>
              
          </div>
      </div>
  
    )
  
}

export default SalesForm
