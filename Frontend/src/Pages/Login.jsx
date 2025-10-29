import myBG from "../assets/Background3.jpg"
import { Link } from "react-router-dom"
import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import axios from 'axios';


const Login = () => {
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const submitHandler = async (e) =>{
    e.preventDefault();
    const loginUser = {
      email,password
    }
  try {
  const response = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/user/login`,
    loginUser,
    {
      withCredentials: true // 👈 very important for cookies
    }
  );

  if (response.status === 200) {
    console.log("✅ Login successful");
    console.log("User:", response.data.user);
    navigate('/home');
  } 
} catch (error) {
  console.log("Login error:", error);
  
  if (error.response && error.response.status === 401) {
    alert('Incorrect email or password');
  } else {
    alert('Login failed. Please try again.');
  }
}
}


  return (
    <div 
    style={{ backgroundImage: `url(${myBG})` }}
    className='flex flex-col items-center gap-10 justify-center h-screen w-screen bg-cover bg-center'>
      <h1 className="text-5xl md:text-8xl font-Playfair text-purple-800">Soandita Jewells</h1>
        <div className='bg-gradient-to-r from-zinc-950 to-zinc-800 rounded-xl flex flex-col
         items-center p-5 hover:border-2 hover:border-orange-100 bg-black h-84 md:w-1/3'>
                <h1 className="text-teal-600 text-4xl font-Playfair mb-7">Login</h1>
                <form
                onSubmit={submitHandler}
                className="w-full">
                  <h2 className="font-Playfair text-xl text-white  mb-1 ">
                  <span><i className="ri-user-line"></i> </span>email</h2>
                    <input
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}
                    type='email' placeholder='Enter Your Email' className="placeholder:italic
                     w-[100%] p-2  hover:border-2 mb-3 hover:border-orange-200"></input>
                    <h2 className="font-Playfair text-xl text-white mt-2 ">
                    <span><i className="ri-lock-line"></i></span> password</h2>
                    <input
                    value = {password}
                    onChange = {(e)=>
                      setpassword(e.target.value)
                    }
                    type='password' placeholder='Enter Password' className="placeholder:italic
                     w-[100%] p-2 hover:border-2 hover:border-orange-200"></input>
                    <button className="bg-teal-600 p-2 font-montserrat mt-7 w-full">Login</button>
                </form>
                <div className="mt-7">
                  <Link to="/forgot" className="text-white underline underline-offset-1 mb-1">Forgot Password?</Link>
                  <Link to="/register"
                  className="text-white underline underline-offset-1 ml-2 ">Create Account</Link>            
                  </div>
          </div>
          </div>
  )
}

export default Login
