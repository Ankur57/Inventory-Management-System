import myBG from "../assets/Background3.jpg"
import Navbar from "../Components/Navbar"

const Insights = () => {
  return (
    <div
    style={{ backgroundImage: `url(${myBG})` }}
    className='h-screen w-screen bg-cover'>
      <div>
        <Navbar/>
      </div>
      
    </div>
  )
}

export default Insights
