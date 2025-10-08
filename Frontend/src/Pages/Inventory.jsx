import myBG from "../assets/Background3.jpg"
import Navbar from "../Components/Navbar"
import { useRef, useState,useEffect } from "react";
import Form from "../Components/Form";
import gsap from "gsap";
import axios from "axios"
import List from "../Components/List"; 
import { useContext } from "react";
import {InventoryContext} from "../Context/InventoryContext";
import Category from "../Components/Category";

const Inventory = () => {

  const { inventoryList, setInventoryList } = useContext(InventoryContext);
  const [form, setform] = useState(false)
  const [Categoryform, setCategoryform] = useState(false)
  const FormPanelRef = useRef(null) 
  const CategoryFormPanelRef = useRef(null) 
  

   const handleAddItem = async (newItem) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/inventory`,newItem);

      if(response.status === 400){
        alert("ProductID Already exist")
      }
    const newInventoryItem = response.data.inventory;
    setInventoryList(prevList => [...prevList, newInventoryItem]);

    setform(false);

    }catch(error){
      console.log("Product registration failed",error);
      alert("Product registration failed")
    }
  }

  const handleCloseForm = () => {
    setform(false);
  };

  const handleCloseCategoryForm = () => {
    setCategoryform(false);
  };

  const handleDeleteItem = async (itemId) => {
  try {
    // 1. Delete from backend
    console.log(itemId)
    await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/inventory/${itemId}`);

    // 2. Remove from local state to update UI
    setInventoryList((prevList) =>
      prevList.filter((item) => item._id !== itemId)
    );
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};


   useEffect(() => {
    if (form) {
      gsap.to(FormPanelRef.current, {
        opacity: 1,
        display: "block", // make sure it shows up
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(FormPanelRef.current, {
        opacity: 0,
        display: "none", // hide when closed
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [form]);

  useEffect(() => {
    if (Categoryform) {
      gsap.to(CategoryFormPanelRef.current, {
        opacity: 1,
        display: "block", // make sure it shows up
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(CategoryFormPanelRef.current, {
        opacity: 0,
        display: "none", // hide when closed
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [Categoryform]);
 
  return (
    <div
    style={{ backgroundImage: `url(${myBG})` }}
    className='h-screen w-screen bg-cover relative'>
    <div style={{ opacity: 0, display: "none" }} ref={FormPanelRef} className="absolute w-[100%] h-[100%]" >
      <Form onAddItem={handleAddItem} onClose={handleCloseForm} setCategoryform={setCategoryform} />
    </div>
    <div style={{ opacity: 0, display: "none" }} ref={CategoryFormPanelRef} className="absolute w-[100%] h-[100%]" >
      <Category onAddItem={handleAddItem} onClose={handleCloseForm} handleCloseCategoryForm={handleCloseCategoryForm} />
    </div>
      <div>
        <Navbar/>
      </div>
      {/*Home Section 1 - Desktop view*/}
      <div className="hidden sm:flex justify-between items-center ml-5 w-[98%] h-[30%]">
        <div className="bg-red-50 flex flex-col items-center ml-10 h-[55%] w-[18%]
         rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair text-4xl mt-3">{inventoryList.length}</h2>
        </div>
        <div className="bg-red-50 flex flex-col items-center mr-10 ml-10 h-[55%] w-[18%]
         rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl ">Categories</h2>
          <h2 className="font-Playfair  text-4xl mt-3">100</h2>
        </div>
        <div className=" bg-red-100 flex flex-col items-center ml-10 h-[55%] w-[18%]
         rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Revenue</h2>
          <h2 className="font-Playfair text-4xl mt-3">100</h2>
        </div>
        <div className=" bg-red-100 mr-14 flex flex-col items-center ml-10 h-[55%] w-[18%]
         rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair text-4xl mt-3">100</h2>
        </div>
        </div>
      {/*Home Section 1 - Mobile view*/}
      <div
      className="flex flex-col justify-between items-center ml-5 w-[98%] h-[40%] sm:hidden ">
      <div className="flex items-center justify-between sm:gap-44 w-[90%] h-[50%]">
      <div className="bg-red-50 flex flex-col items-center ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
        rounded-xl border-2 border-slate-950">
        <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Total Items</h2>
        <h2 className="font-Playfair text-4xl mt-3">{inventoryList.length}</h2>
      </div>
      <div className="bg-red-50 flex flex-col items-center mr-10 ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
        rounded-xl border-2 border-slate-950">
        <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Categories</h2>
        <h2 className="font-Playfair  text-4xl mt-3">100</h2>
      </div>
      </div>
      <div className="flex items-center justify-between sm:gap-44 w-[90%] h-[50%]">
      <div className="bg-red-50 flex flex-col items-center ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
        rounded-xl border-2 border-slate-950">
        <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Revenue</h2>
        <h2 className="font-Playfair text-4xl mt-3">100</h2>
      </div>
      <div className="bg-red-50 flex flex-col items-center mr-10 ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
        rounded-xl border-2 border-slate-950">
        <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Total Items</h2>
        <h2 className="font-Playfair text-4xl mt-3">100</h2>
      </div>
      </div>
      </div>
      <List setform={setform} handleDeleteItem={handleDeleteItem}
       inventoryList={inventoryList} setInventoryList={setInventoryList} />
    </div>
  )
}

export default Inventory
