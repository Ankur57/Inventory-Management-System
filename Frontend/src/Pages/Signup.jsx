import myBG from "../assets/Background3.jpg"
import { Link, useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import { useState } from "react"
import axios from "axios"


const Signup = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [firstname, setfirstname] = useState('')
  const [lastname, setlastname] = useState('')
  const [code, setcode] = useState('')
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const submitHandler = async (e)=>{
    e.preventDefault();
    const newUser = {
      email,
      fullname : {
        firstname,
        lastname
      },
      password,
      code
    }
    try{
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/user/register`,
        newUser,
        {
          withCredentials: true, // ✅ allow backend to set cookie
        }
      );
      setemail('')
      setpassword('')
      setfirstname('')
      setlastname('')

      if(response.status === 201){
        navigate('/home')
      }
      if(response.status === 400){
        alert("User Already exist")
      }

    }catch(error){
      console.log("Signup failed",error);
      alert("Signup Failed")
    }
  }

  return (
    <div 
        style={{ backgroundImage: `url(${myBG})` }}
        className='flex flex-col items-center gap-10 justify-center h-screen w-screen bg-cover overflow-hidden bg-center"'>
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-Playfair text-purple-800">Soandita Jewells</h1>
            <div className='bg-gradient-to-r from-zinc-950 to-zinc-800 rounded-xl flex flex-col
             items-center p-5 hover:border-2 hover:border-orange-100 bg-black h-84 w-72 sm:w-96 md:w-1/3'>
                    <h1 className="text-teal-600  text-2xl lg:text-4xl font-Playfair mb-7">Create Account</h1>
                    <form
                    onSubmit={submitHandler}
                    className="w-full">
                    <div className="flex items-center w-full">
                        <div className="flex flex-col w-[50%]">
                        <h2 className="font-Playfair sm:text-lg  md:text-xl text-white  mb-1 ">First Name</h2>
                            <input
                            value={firstname}
                            onChange={(e)=>{setfirstname(e.target.value)}}
                            type='text' placeholder='First Name' className="placeholder:italic
                            w-[110%] p-2  hover:border-2 mb-3 hover:border-orange-200"></input>
                        </div>
                        <div className="flex flex-col ml-14 w-[50%]">
                        <h2 className="font-Playfair md:text-xl text-lg text-white  mb-1 ">Last Name</h2> 
                            <input
                            value = {lastname}
                            onChange={(e)=>{setlastname(e.target.value)}}
                            type='text' placeholder='Last Name' className="placeholder:italic
                            w-[100%] p-2  hover:border-2 mb-3 hover:border-orange-200"></input>
                        </div>
                    </div>
                        <h2 className="font-Playfair text-xl text-white mt-2 ">
                        <span><i className="ri-user-line"></i> </span> email</h2>
                        <input
                        value={email}
                        onChange={(e)=>{setemail(e.target.value)}}
                        type='email' placeholder='Enter Password' className="placeholder:italic
                         w-[100%] p-2 hover:border-2 hover:border-orange-200"></input>
                        <h2 className="font-Playfair text-xl text-white mt-2 ">
                        <span><i className="ri-lock-line"></i></span> password</h2>
                        <input
                        value={password}
                        onChange={(e)=>{setpassword(e.target.value)}}
                        type='password' placeholder='Enter Password' className="placeholder:italic
                         w-[100%] p-2 hover:border-2 hover:border-orange-200"></input>
                         <h2 className="font-Playfair text-xl text-white mt-2 ">
                        <span><i className="ri-lock-line"></i></span>Code</h2>
                        <input
                        value={code}
                        onChange={(e)=>{setcode(e.target.value)}}
                        type='password' placeholder='Enter Code' className="placeholder:italic
                         w-[100%] p-2 hover:border-2 hover:border-orange-200"></input>
                        <motion.button
                        whileHover={{ scale: 1.1 }}
                        className="bg-teal-600 p-2 font-montserrat mt-7 w-full">Create Account</motion.button>
                    </form>
                    <div className="mt-7">
                      <Link to='/login' className="text-white underline underline-offset-1 ml-2 ">Login</Link>
                    </div>            
            </div>
          
        </div>
  )
}

export default Signup
