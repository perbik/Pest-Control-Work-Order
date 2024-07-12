import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Routes,Route } from "react-router-dom"
import Add from './pages/Add/Add'
import Customers from './pages/Customers/Customers'
import Dashboard from './pages/Dashboard/Dashboard'
import Orders from './pages/Orders/Orders'
import Products from './pages/Products/Products'
import UpdateProd from './pages/Update/UpdateProd'
import UpdateCust from './pages/Update/UpdateCust'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <div>
      <ToastContainer/>
      <Navbar/>
      <hr/>
      <div className="app-content">
        <Sidebar/>
          <Routes>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/add" element={<Add/>}/>
            <Route path="/products" element={<Products/>}/>
            <Route path="/customers" element={<Customers/>}/>
            <Route path="/orders" element={<Orders/>}/>
            <Route path="/updateprod/:ProductID" element={<UpdateProd/>}/>
            <Route path="/updatecust/:ProductID" element={<UpdateCust/>}/>
          </Routes>
      </div>
    </div>
  )
}

export default App
