import myBG from "../assets/Background3.jpg"
import { Link } from "react-router-dom"

const Forgot = () => {
  return (
     <div 
        style={{ backgroundImage: `url(${myBG})` }}
        className='flex flex-col items-center gap-10 justify-center h-screen w-screen bg-cover bg-center"'>
          <h1 className="text-5xl md:text-7xl font-Playfair text-purple-800">Soandita Jewells</h1>
            <div className='bg-gradient-to-r from-zinc-950 to-zinc-800 rounded-xl flex flex-col
             items-center p-5 hover:border-2 hover:border-orange-100 bg-black h-84 md:w-1/3'>
                    <h1 className="text-teal-600 text-3xl lg:text-4xl font-Playfair mb-7">Change Password</h1>
                    <form className="w-full">
                      <h2 className="font-Playfair text-xl text-white  mb-1 ">
                      <span><i className="ri-user-line"></i> </span>email</h2>
                        <input type='email' placeholder='Enter Your Email' className="placeholder:italic
                         w-[100%] p-2  hover:border-2 mb-3 hover:border-orange-200"></input>
                        <h2 className="font-Playfair text-xl text-white mt-2 ">
                        <span><i className="ri-lock-line"></i></span> password</h2>
                        <input type='password' placeholder='Enter Password' className="placeholder:italic
                         w-[100%] p-2 hover:border-2 hover:border-orange-200"></input>
                         <h2 className="font-Playfair text-xl text-white mt-2 ">
                        <span><i className="ri-lock-line"></i></span> Code</h2>
                        <input type='password' placeholder='Enter Code' className="placeholder:italic
                         w-[100%] p-2 hover:border-2 hover:border-orange-200"></input>
                        <button className="bg-teal-600 p-2 font-montserrat mt-7 w-full">Change Password</button>
                    </form>
                    <div className="mt-7">
                      <Link to='/login' className="text-white underline underline-offset-1 ml-2 ">Login</Link>
                    </div>            
            </div>
          
        </div>
  )
}

export default Forgot
