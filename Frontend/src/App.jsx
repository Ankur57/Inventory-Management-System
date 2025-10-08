import './App.css'
import AddItem from './Pages/AddItem'
import Forgot from './Pages/Forgot'
import Home from './Pages/Home'
import Insights from './Pages/Insights'
import Inventory from './Pages/Inventory'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import UserProtectedWrapper from './Components/UserProtectedWrapper'


import { Route, Routes} from 'react-router-dom'


export default function App() {
  return (
    <div>
      <Routes>
        {/*<Navbar/>*/}
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Signup/>}/>
        <Route path = '/forgot' element = {<Forgot/>}/>
        <Route path = '/home'
         element = {
        <UserProtectedWrapper>
          <Home/>
        </UserProtectedWrapper>
          }/>
        <Route path = '/inventory'
        element = {
        <UserProtectedWrapper>
        <Inventory/>
        </UserProtectedWrapper>
        }
        />
        <Route path = '/insights' element = {<Insights/>}/>
        <Route path = '/addItem' element = {<AddItem/>}/>
      </Routes>
    </div>
  )
}
