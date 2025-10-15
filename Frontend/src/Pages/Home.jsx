import myBG from "../assets/Background3.jpg"
import Navbar from '../Components/Navbar'
import Home_Chart from "../Components/Home_Chart"
import { useContext } from "react";
import { Link } from "react-router-dom"
import axios from "axios"
import { useEffect,useState } from "react";
import HomeList from "../Components/HomeList"
import SalesPerMonthChart from "../Components/Chart1"
import { CategoryContext } from "../Context/CategoryContext"; // <-- Used to get CategoryList
import { ProductContext } from "../Context/ProductContext"; 


const API_ENDPOINT = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/sales-per-month`,
{
  withCredentials: true, // ✅ send JWT cookie
}
);
console.log(API_ENDPOINT)

const Home = () => {
  const [inventoryList, setinventoryList] = useState([])
  const { CategoryList, setCategoryList } = useContext(CategoryContext); // <-- Defined here!
    const { ProductList, setProductList } = useContext(ProductContext)

  useEffect(() => {
      const fetchInventory = async () => {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/user/inventory`,
            {
              withCredentials: true, // ✅ send JWT cookie
            }
          );
          setinventoryList(res.data);
        } catch (error) {
          console.error("Error fetching inventory:", error);
        }
      };
  
      fetchInventory();
    }, []);


  return (
    <div
    style={{ backgroundImage: `url(${myBG})` }}
    className='h-screen w-screen bg-cover'>
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
      {/*Home Section 2 - Inventory Desktop-view */}
      <div className="hidden md:flex flex-col h-[100%] w-[98%] ">
      <div className="ml-5 w-[100%] bg-red-50 mt-5 mr-5 h-[50%] gap-4 md:flex">
        <div className="w-[70%] h-[100%]  border-2 border-slate-950  overflow-auto">
          <div className="flex justify-between w-[100%] ">
          <h1 className="font-Playfair text-2xl md:text-4xl p-2 font-semibold">Your Inventory</h1>
          <Link to='/inventory'
          className="font-bold text-right text-blue-800 mb-4 mr-2 mt-2 underline underline-offset-2
          cursor-pointer">Manage Inventory</Link>
          </div>
          <div className="flex justify-between mr-3 ml-2 bg-red-50">
            <HomeList
            inventoryList={inventoryList} />
          </div>
      </div>
      <div className="w-[30%] h-[100%] border-2 border-slate-950">
        <h1 className="font-Playfair font-semibold mt-5 text-xl">Total Items</h1>
        <Home_Chart/>
      </div>
      </div>
      <div style={{ backgroundImage: `url(${myBG})` }} 
        className="bg"
      ></div>
      <div
      className="hidden ml-5 w-[100%] bg-red-50 mt-5 mr-5 h-[70%] gap-4 md:flex">
      <div className="w-[100%] h-[100%] border-2 bg-red-50  border-slate-950">
        <div className="flex justify-between w-[100%] p-2">
          <h1 className="font-Playfair text-xl p-2 font-bold">Sales Over Time</h1>
          <Link to='/insights'
          className="font-bold text-right text-blue-800 p-2 underline underline-offset-2
          cursor-pointer">Business Insights</Link>
          </div>
        <SalesPerMonthChart/>
      </div>
      </div>
      </div>

      {/*Home Section 2 - Inventory Mobile-View */}
      <div className="md:hidden ml-2 w-[98%] h-[160%] gap-4 flex flex-col">
        <div className="w-[100%] h-[100%] border-2 bg-red-50 border-slate-950 mr-10 overflow-auto">
          <div className="flex justify-between w-[100%] ">
          <h1 className="font-Playfair text-xl ml-5 font-bold">Inventory</h1>
          <h2 className="font-bold text-right text-blue-800 mb-4 mr-2 mt-2 underline underline-offset-2
          cursor-pointer">Manage Inventory</h2>
          </div>
          <div className="flex justify-between mr-3 ml-2">
            <HomeList
            inventoryList={inventoryList}/>
          </div>
      </div>   
      <div className="w-[100%] h-[100%] border-2 bg-red-50 border-slate-950">
        <h1 className="font-Playfair font-semibold mt-5 text-xl">Total Items</h1>
        <Home_Chart/>
      </div>
      <div className="w-[100%] h-[100%] border-2 bg-red-50  border-slate-950">
        <div className="flex justify-between w-[100%] p-2">
          <h1 className="font-Playfair text-xl p-2 font-bold">Sales Over Time</h1>
          <Link to='/insights'
          className="font-bold text-right text-blue-800 p-2 underline underline-offset-2
          cursor-pointer">Business Insights</Link>
          </div>
        <SalesPerMonthChart/>
      </div>
      </div>
    </div>
  )
}

export default Home
