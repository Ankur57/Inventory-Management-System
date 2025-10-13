import './App.css'
import AddItem from './Pages/AddItem'
import Forgot from './Pages/Forgot'
import Home from './Pages/Home'
import Insights from './Pages/Insights'
import Inventory from './Pages/Inventory'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import UserProtectedWrapper from './Components/UserProtectedWrapper'
import CategoryProvider from './Context/CategoryContext'
import ProductProvider from './Context/ProductContext'
import InventoryProvider from './Context/InventoryContext'
import MatrixProvider from './Context/MetricsContext'
import { Route, Routes} from 'react-router-dom'


export default function App() {
  return (
    <div>
      <Routes>
        {/*<Navbar/>*/}
        <Route path = '/' element = {<Login/>}/>
        <Route path = '/login' element = {<Login/>}/>
        <Route path = '/register' element = {<Signup/>}/>
        <Route path = '/forgot' element = {<Forgot/>}/>
        <Route path = '/home'
         element = {
        <MatrixProvider>
        <UserProtectedWrapper>
          <InventoryProvider>
            <ProductProvider>
              <CategoryProvider>
                <Home/>
              </CategoryProvider>
            </ProductProvider>
          </InventoryProvider>
        </UserProtectedWrapper>
        </MatrixProvider>
          }/>
        <Route path = '/inventory'
        element = {
        <UserProtectedWrapper>
          <InventoryProvider>
            <ProductProvider>
              <CategoryProvider>
                <Inventory/>        
              </CategoryProvider>
            </ProductProvider>
          </InventoryProvider>
        </UserProtectedWrapper>
        }
        />
        <Route path = '/insights' element = {
          <CategoryProvider>
            <ProductProvider>
              <Insights/>
            </ProductProvider>
          </CategoryProvider>
          
          }/>
        <Route path = '/addItem' element = {<AddItem/>}/>
      </Routes>
    </div>
  )
}
