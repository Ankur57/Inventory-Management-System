import mylogo from "../assets/Logo3.png"
import myBG from "../assets/Background3.jpg"
import {motion} from "motion/react"

const Start = () => {
  return (
    <div
    style={{ backgroundImage: `url(${myBG})` }}
    className='flex flex-col items-center h-screen overflow-hidden w-screen bg-cover bg-center'>
        <img src={mylogo} alt="logo" className='w-[40%] h-42'></img>
        <motion.h1     
        initial={{ opacity: 0,filter: "blur(10px)", x: 0 }}
        animate={{ opacity: 1, filter: "none", x:100  }}
        transition={{ duration: 1 }}
        className="text-black font-Playfair text-3xl lg:text-6xl xl:text-8xl mt-10">INVENTORY MANAGEMENT SYSTEM
        </motion.h1>
        <motion.h1     
        initial={{ opacity: 0,filter: "blur(10px)", x: 0 }}
        animate={{ opacity: 1, filter: "none", x:100  }}
        transition={{ duration: 1}}
        className="text-black font-Playfair text-4xl lg:text-6xl xl:text-8xl">
        </motion.h1>
        <motion.button
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        transition={{ duration: 4 }}
        className="bg-black text-white text-2xl font-Playfair rounded-md  
        p-5 mt-16 hover:border-2 ml-20">Login/SignUp</motion.button>
    </div>
  )
}

export default Start
