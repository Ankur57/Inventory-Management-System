import myBG from "../assets/Background3.jpg"
import Navbar from "../Components/Navbar"
import { useNavigate } from 'react-router-dom';
import { useRef, useState, useEffect } from "react";
import Form from "../Components/Form";
import gsap from "gsap";
import { useGSAP } from "@gsap/react"; 
import 'remixicon/fonts/remixicon.css';


const initialInventory = [
  { id: 1, category: 'Jewellery', product: 'Ring', price: 1500, costPrice: 1000, profit: 500 },
  { id: 2, category: 'Wallet', product: 'Leather Wallet', price: 800, costPrice: 500, profit: 300 }
];

const Inventory = () => {

  const [form, setForm] = useState(false);
  const [inventoryList, setInventoryList] = useState(initialInventory);
  const FormPanelRef = useRef(null);
  
  // Handlers to manage the inventory list
  const handleAddItem = (newItem) => {
    // In a real app, this is where you would send data to your database (e.g., Firestore)
    // For now, we'll just add it to our local state
    setInventoryList((prevList) => [...prevList, { ...newItem, id: Date.now() }]);
    setForm(false);
  };
  
  const handleDeleteItem = (id) => {
    // Filter out the item with the matching ID
    setInventoryList((prevList) => prevList.filter(item => item.id !== id));
  };

  const handleCloseForm = () => {
    setForm(false);
  };

  useEffect(() => {
    if (form) {
      gsap.to(FormPanelRef.current, {
        opacity: 1,
        display: "block",
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(FormPanelRef.current, {
        opacity: 0,
        display: "none",
        duration: 0.5,
        ease: "power2.in"//to visit
      });
    }
  }, [form]);
      
  return (
    <div
      style={{ backgroundImage: `url(${myBG})` }}
      className='h-screen w-screen bg-cover relative'>
      <div style={{ opacity: 0, display: "none" }} ref={FormPanelRef} className="absolute w-[100%] h-[100%]" >
        <Form onAddItem={handleAddItem} onClose={handleCloseForm}/>
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
          <h2 className="font-Playfair text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair  text-4xl mt-3">{inventoryList.length}</h2>
        </div>
        <div className=" bg-red-100 flex flex-col items-center ml-10 h-[55%] w-[18%]
          rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair text-4xl mt-3">{inventoryList.length}</h2>
        </div>
        <div className=" bg-red-100 mr-14 flex flex-col items-center ml-10 h-[55%] w-[18%]
          rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair text-4xl mt-3">{inventoryList.length}</h2>
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
          <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair  text-4xl mt-3">{inventoryList.length}</h2>
        </div>
        </div>
        <div className="flex items-center justify-between sm:gap-44 w-[90%] h-[50%]">
        <div className="bg-red-50 flex flex-col items-center ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
          rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair text-4xl mt-3">{inventoryList.length}</h2>
        </div>
        <div className="bg-red-50 flex flex-col items-center mr-10 ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
          rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair text-4xl mt-3">{inventoryList.length}</h2>
        </div>
        </div>
      </div>

      <div
        style={{ backgroundImage: `url(${myBG})` }}
        className="w-screen h-screen bg-cover">
        <div className=" border-2 rounded-xl border-black bg-red-50 h-[100%] w-[98%] ml-3 overflow-auto ">
          <div className="flex justify-between mr-4 mt-2">
            <h1 className="font-Playfair text-2xl md:text-4xl p-2 font-semibold">Your Inventory</h1>
            <button
              onClick={() => setForm(true)}
              className="bg-sky-200 font-semibold text-black sm:text-lg md:text-xl rounded-lg
                w-[30%] sm:w-[20%] p-4">Add Item</button>
          </div>
          <div className="h-1 w-[150%] sm:w-[100%] bg-gray-500 mb-2 mt-2"></div>
          <div className="flex justify-between mr-3 ml-2 w-[150%] sm:w-[95%]">
            <div className="flex flex-col gap-2">
              <h2 className="font-Playfair text-xl font-semibold">Product ID</h2>
              {inventoryList.map(item => (
                <h3 key={item.id} className="font-Playfair text-xl text-center font-medium">
                  {item.id}
                </h3>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-Playfair text-xl font-semibold ">Category</h2>
              {inventoryList.map(item => (
                <h3 key={item.id} className="font-Playfair text-xl text-center font-medium">
                  {item.category}
                </h3>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-Playfair text-xl font-semibold ">Product</h2>
              {inventoryList.map(item => (
                <h3 key={item.id} className="font-Playfair text-xl text-center font-medium">
                  {item.product}
                </h3>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-Playfair text-xl font-semibold ">Price</h2>
              {inventoryList.map(item => (
                <h3 key={item.id} className="text-xl">
                  ₹<span className="text-xl text-center font-medium">{item.price}</span>
                </h3>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="font-Playfair text-xl font-semibold ">Action</h2>
              {inventoryList.map(item => (
                <button 
                  key={item.id} 
                  onClick={() => handleDeleteItem(item.id)}
                  className="font-Playfair text-xl text-center font-medium text-red-600">
                  Delete
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Inventory