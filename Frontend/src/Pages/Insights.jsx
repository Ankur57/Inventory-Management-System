import myBG from "../assets/Background3.jpg"
import CategoryChart from "../Components/CategoryChart"
import SalesPerMonthChart from "../Components/Chart1"
import Home_Chart from "../Components/Home_Chart"
import SalesSourceChart from "../Components/SalesSourceChart"
import Navbar from "../Components/Navbar"
import SalesForm from "../Components/SalesForm"
import { useState,useRef,useEffect } from "react"
import gsap from "gsap";
import axios from "axios"
import SourceForm from "../Components/SourceForm"
import { useContext } from "react";
import {SourceContext} from '../Context/SourceContext'



const Insights = () => {
    const [Salesform, setSalesform] = useState(false)
    const SalesFormPanelRef = useRef(null)
    const [Sourceform, setSourceform] = useState(false)
    const SourceFormPanelRef = useRef(null)
    const {SourceList,setSourceList} = useContext(SourceContext)
  

  const handleCloseSalesForm = () => {
    setSalesform(false);
  };

  const handleNewSource = async (Source) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/AddSource`,Source);

      if(response.status === 400){
        alert("Source Already exist")
      }
    const newSourceItem = response.data.updatedSource;
    console.log(newSourceItem)
    setSourceList(prevList => [...prevList, newSourceItem]);

    setSourceform(false);

    }catch(error){
      console.log("Source registration failed",error);
      alert("Source registration failed")
    }
  }

const handleCloseSourceForm = () => {
    setSourceform(false);
  };
const handleAddSource = async (Source) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/AddSource`,Source);

      if(response.status === 400){
        alert("Source Already exist")
      }

    const newSourceItem = response.data.Source;
    setSourceList(prevList => [...prevList, newSourceItem]);

    setSalesform(false);
    setSourceform(false);
    }catch(error){
      console.log("Source registration failed",error);
      alert("Source registration failed")
    }
  }

  useEffect(() => {
    if (Salesform) {
      gsap.to(SalesFormPanelRef.current, {
        opacity: 1,
        display: "block", // make sure it shows up
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(SalesFormPanelRef.current, {
        opacity: 0,
        display: "none", // hide when closed
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [Salesform]);

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
      <div style={{ opacity: 0, display: "none" }} ref={SalesFormPanelRef} className="absolute w-[100%] z-50 h-[60%]" >
        <SalesForm handleAddSource={handleAddSource} SourceFormPanelRef={SourceFormPanelRef}
        Sourceform={Sourceform} setSourceform={setSourceform}
        handleCloseSalesForm={handleCloseSalesForm} handleCloseSourceForm={handleCloseSourceForm}/>
      </div>
        <div style={{ opacity: 0, display: "none" }} ref={SourceFormPanelRef} className="absolute w-[100%] z-50 h-[60%]" >
          <SourceForm handleAddSource={handleAddSource} 
          Sourceform={Sourceform} handleNewSource={handleNewSource}
          handleCloseSalesForm={handleCloseSalesForm} handleCloseSourceForm={handleCloseSourceForm}/>
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
      <div className="flex items-center justify-center mb-5 overflow-x-auto sm:overflow-hidden">
        {/* The inner container holds the chart and controls its overall size. 
            We set a min-width on small screens (w-[95%]) but allow the content 
            (the chart) to expand past it to trigger the scrollbar. */}
        <div className="w-[95%] h-[75%] border-2 bg-red-50 border-slate-950">
          <div className="flex justify-between">
            <h1 className="font-Playfair text-xl p-2 font-bold">Source of Sales</h1>
            <button            onClick={() =>{setSalesform(true)}}
              className="mt-3 mr-2 bg-sky-200 font-semibold text-black text-sm sm:text-lg md:text-xl rounded-lg
                w-[30%] sm:w-[20%] p-2 md:p-4 transition duration-150 ease-in-out hover:bg-sky-300"
            >
              Add Source
            </button>
          </div>
          {/* SalesSourceChart will render with a potentially wider width, 
              making the outer div scrollable on small screens. */}
          <SalesSourceChart/>
        </div>
      </div>
      
      </div>
    </div>
  )
}

export default Insights
