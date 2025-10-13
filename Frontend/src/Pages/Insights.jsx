import myBG from "../assets/Background3.jpg"
import CategoryChart from "../Components/CategoryChart"
import SalesPerMonthChart from "../Components/Chart1"
import Home_Chart from "../Components/Home_Chart"
import SalesSourceChart from "../Components/SalesSourceChart"
import Navbar from "../Components/Navbar"
import Source from "../Components/Source"
import { useState,useRef,useEffect } from "react"
import gsap from "gsap";
import axios from "axios"

const Insights = () => {
    const [Sourceform, setSourceform] = useState(false)
    const SourceFormPanelRef = useRef(null)

  const handleCloseSourceForm = () => {
    setSourceform(false);
  };

const handleAddSource = async (Source) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/AddSource`,Source);

      if(response.status === 400){
        alert("Category Already exist")
      }
    setSourceform(false);

    }catch(error){
      console.log("Source registration failed",error);
      alert("Source registration failed")
    }
  }

  useEffect(() => {
    if (Sourceform) {
      gsap.to(SourceFormPanelRef.current, {
        opacity: 1,
        display: "block", // make sure it shows up
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(SourceFormPanelRef.current, {
        opacity: 0,
        display: "none", // hide when closed
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [Sourceform]);


  return (
    <div
    style={{ backgroundImage: `url(${myBG})` }}
    className='h-full w-full bg-cover relative'>
      <div>
        <Navbar/>
      </div>
      <div style={{ opacity: 0, display: "none" }} ref={SourceFormPanelRef} className="absolute w-[100%] z-50 h-[60%]" >
        <Source handleAddSource={handleAddSource} handleCloseSourceForm={handleCloseSourceForm}/>
      </div>
      <div className="w-[100%] h-[100%] mt-2 justify-between">
      <div className="flex items-center justify-center mb-5">
      <div className="w-[100%] sm:w-[47%] h-[45%] mr-3 border-2 bg-red-50 border-slate-950">
        <h1 className="font-Playfair text-xl p-2 font-bold">Total items</h1>
        <Home_Chart/>
      </div>
      <div className="sm:block hidden w-[47%] h-[45%] border-2 bg-red-50 border-slate-950">
        <h1 className="font-Playfair text-xl p-2 font-bold">Sales per items</h1>
        <CategoryChart/>
      </div>
      </div>
      <div className=" flex items-center justify-center mb-5 overflow-auto">
      <div className="w-[95%] h-[45%] border-2 bg-red-50 border-slate-950">        
        <SalesPerMonthChart/>
      </div>
      </div>
      <div className=" flex items-center justify-center mb-5 overflow-auto">
      <div className="w-[95%] h-[45%] border-2  bg-red-50 border-slate-950">
        <div className="flex justify-between">
          <h1 className="font-Playfair text-xl p-2 font-bold">Source of Sales</h1>
          <button
          onClick={() =>{setSourceform(true)}}
            className="mt-3 mr-2 bg-sky-200 font-semibold text-black text-sm sm:text-lg md:text-xl rounded-lg
              w-[30%] sm:w-[20%] p-2 md:p-4 transition duration-150 ease-in-out hover:bg-sky-300"
          >
            Add Source
          </button>
        </div>
        <SalesSourceChart/>
      </div>
      </div>
      
      </div>
    </div>
  )
}

export default Insights
