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
import Product from "../Components/Product";
import { ProductContext } from "../Context/ProductContext";
import { CategoryContext } from "../Context/CategoryContext";

const API_ENDPOINT = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/sales-per-month`,
{
  withCredentials: true, // ✅ send JWT cookie
}
);

const Inventory = () => {

  const { inventoryList, setInventoryList } = useContext(InventoryContext);
  const {ProductList,setProductList} = useContext(ProductContext)
  const {CategoryList,setCategoryList} = useContext(CategoryContext)
  const [form, setform] = useState(false)
  const [Categoryform, setCategoryform] = useState(false)
  const [Productform, setProductform] = useState(false)
  const [onSearchChange, setonSearchChange] = useState("") // Holds the current search query
  const FormPanelRef = useRef(null)
  const CategoryFormPanelRef = useRef(null)
  const ProductFormPanelRef = useRef(null) 
  
// --- NEW FUNCTION TO HANDLE FILTERING AND SORTING ---
const getFilteredInventoryList = () => {
    const query = onSearchChange.toLowerCase().trim();

    if (!query) {
        return inventoryList;
    }

    // 1. Filter: Keep items where the ID includes the search query
    const filtered = inventoryList.filter(item =>
        item.id.toLowerCase().includes(query)
    );

    // 2. Sort/Shift: Move the exact match to the top
    filtered.sort((a, b) => {
        const aId = a.id.toLowerCase();
        const bId = b.id.toLowerCase();

        // Check for exact match (Case-insensitive)
        const aIsExactMatch = aId === query;
        const bIsExactMatch = bId === query;

        if (aIsExactMatch && !bIsExactMatch) {
            return -1; // a comes first
        }
        if (!aIsExactMatch && bIsExactMatch) {
            return 1;  // b comes first
        }

        // Optional: Keep items that start with the query higher than others
        const aStartsWith = aId.startsWith(query);
        const bStartsWith = bId.startsWith(query);

        if (aStartsWith && !bStartsWith) return -1;
        if (!aStartsWith && bStartsWith) return 1;

        // Default sort (e.g., by Product ID alphabetically)
        return aId.localeCompare(bId);
    });

    return filtered;
};
// ---------------------------------------------------

   const handleAddItem = async (newItem) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/inventory`,newItem);
      
      if(response.status === 400){
        alert("ProductID Already exist")
      }
    const newInventoryItem = response.data.inventory;
    setInventoryList(prevList => [...prevList, newInventoryItem]);

    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/updateQuantity`,
      { name: newItem.product }, // send product name
      { withCredentials: true }
    );

    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/updateCategoryQuantity`,
      { name: newItem.category }, // send product name
      { withCredentials: true }
    );


    setform(false);

    }catch(error){
      console.log("Product registration failed",error);
      alert("Product registration failed")
    }
  }

  const handleAddCategory = async (Category) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/Addcategory`,Category);

      if(response.status === 400){
        alert("Category Already exist")
      }
    const newCategoryItem = response.data.Category;
    setCategoryList(prevList => [...prevList, newCategoryItem]);

    setCategoryform(false);

    }catch(error){
      console.log("Category registration failed",error);
      alert("Category registration failed")
    }
  }

  const handleAddProduct = async (Product) => {
    try{
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/AddProduct`,Product);

      if(response.status === 400){
        alert("Category Already exist")
      }
    const newProductItem = response.data.Product;
    setProductList(prevList => [...prevList, newProductItem]);

    setProductform(false);

    }catch(error){
      console.log("Product registration failed",error);
      alert("Product registration failed")
    }
  }

  const handleCloseForm = () => {
    setform(false);
  };

  const handleCloseProductForm = () => {
    setProductform(false);
  };

  const handleCloseCategoryForm = () => {
    setCategoryform(false);
  };

  const handleDeleteItem = async (itemId,itemcategory,itemproduct) => {
  try {
    // 1. Delete from backend
    console.log(itemId)

    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/DecreaseProductQuantity`,
      { name: itemproduct}, // send product name
      { withCredentials: true }
    );

    await axios.put(
      `${import.meta.env.VITE_BASE_URL}/user/DecreaseCategoryQuantity`,
      { name: itemcategory }, // send product name
      { withCredentials: true }
    );

    await axios.delete(`${import.meta.env.VITE_BASE_URL}/user/inventory/${itemId}`);

    // 2. Remove from local state to update UI
      setInventoryList((prevList) =>
      prevList.filter((item) => item._id !== itemId)
    );
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

const handleSales = async(product)=>{
  try {
    console.log(product)
    await axios.post(`${import.meta.env.VITE_BASE_URL}/user/sales/`,product);

  } catch (error) {
    console.error("Error Updating Sales of item:", error);
  }
}

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

  useEffect(() => {
    if (Productform) {
      gsap.to(ProductFormPanelRef.current, {
        opacity: 1,
        display: "block", // make sure it shows up
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(ProductFormPanelRef.current, {
        opacity: 0,
        display: "none", // hide when closed
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [Productform]);
 
  return (
    <div
    style={{ backgroundImage: `url(${myBG})` }}
    className='h-screen w-screen bg-cover relative'>
    <div style={{ opacity: 0, display: "none" }} ref={FormPanelRef} className="absolute w-[100%] h-[100%]" >
      <Form onAddItem={handleAddItem} onClose={handleCloseForm}
      setProductform={setProductform} setCategoryform={setCategoryform}
      setProductList={setProductList} ProductList={ProductList} CategoryList={CategoryList}
      setCategoryList={setCategoryList} handleAddCategory={handleAddCategory}
      />
    </div>
    <div style={{ opacity: 0, display: "none" }} ref={CategoryFormPanelRef} className="absolute w-[100%] h-[100%]" >
      <Category handleAddCategory={handleAddCategory} handleCloseCategoryForm={handleCloseCategoryForm} />
      </div>
    <div style={{ opacity: 0, display: "none" }} ref={ProductFormPanelRef} className="absolute w-[100%] h-[100%]" >
      <Product handleAddProduct={handleAddProduct} handleCloseProductForm={handleCloseProductForm}/>
    </div>
      <div>
        <Navbar/>
      </div>
      {/*Home Section 1 - Desktop view*/}
      <div className="hidden sm:flex justify-between items-center ml-5 w-[98%] h-[30%] ">
        <div className="bg-red-50 flex flex-col items-center ml-10 h-[55%] w-[18%]
         rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Total Items</h2>
          <h2 className="font-Playfair text-4xl mt-3">{inventoryList.length}</h2>
        </div>
        <div className="bg-red-50 flex flex-col items-center mr-10 ml-10 h-[55%] w-[18%]
         rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Categories</h2>
          <h2 className="font-Playfair  text-4xl mt-3">{CategoryList.length}</h2>
        </div>
        <div className=" bg-red-100 flex flex-col items-center ml-10 h-[55%] w-[18%]
         rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Product</h2>
          <h2 className="font-Playfair text-4xl mt-3">{ProductList.length}</h2>
        </div>
        <div className=" bg-red-100 mr-14 flex flex-col items-center ml-10 h-[55%] w-[18%]
         rounded-xl border-2 border-slate-950">
          <h2 className="font-Playfair text-xl md:text-2xl">Revenue</h2>
          <h2 className="font-Playfair text-4xl mt-3">{API_ENDPOINT.data[0].totalSales}</h2>
        </div>
        </div>
      {/*Home Section 1 - Mobile view*/}
      <div className="flex flex-col justify-between items-center ml-5 w-[98%] h-[40%] sm:hidden ">
      <div className="flex items-center justify-between sm:gap-44 w-[90%] h-[50%]">
      <div className="bg-red-50 flex flex-col items-center ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
        rounded-xl border-2 border-slate-950">
        <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Total Items</h2>
        <h2 className="font-Playfair text-4xl mt-3">{inventoryList.length}</h2>
      </div>
      <div className="bg-red-50 flex flex-col items-center mr-10 ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
        rounded-xl border-2 border-slate-950">
        <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Categories</h2>
        <h2 className="font-Playfair  text-4xl mt-3">{CategoryList.length}</h2>
      </div>
      </div>
      <div className="flex items-center justify-between sm:gap-44 w-[90%] h-[50%]">
      <div className="bg-red-50 flex flex-col items-center ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
        rounded-xl border-2 border-slate-950">
        <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Product</h2>
        <h2 className="font-Playfair text-4xl mt-3">{ProductList.length}</h2>
      </div>
      <div className="bg-red-50 flex flex-col items-center mr-10 ml-10 h-[55%] w-[50%] min-[410px]:w-[30%]
        rounded-xl border-2 border-slate-950">
        <h2 className="font-Playfair text-lg min-[450]:text-xl md:text-2xl">Revenue</h2>
        <h2 className="font-Playfair text-4xl mt-3">{API_ENDPOINT.data[0].totalSales}</h2>
      </div>
      </div>
      </div>
      <List setform={setform} handleDeleteItem={handleDeleteItem}
       inventoryList={getFilteredInventoryList()} setInventoryList={setInventoryList} handleSales={handleSales} // <-- PASS THE FILTERED LIST HERE
       onSearchChange={onSearchChange} setonSearchChange={setonSearchChange}
       />
    </div>
  )
}

export default Inventory