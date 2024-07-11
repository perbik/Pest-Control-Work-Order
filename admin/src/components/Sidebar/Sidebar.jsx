import React from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="sidebar-options">
            <NavLink to='/dashboard' className="sidebar-option">
                <img className='icons' src={assets.dashboard} alt="" />
                <p>Dashboard</p>
            </NavLink>
            <NavLink to='/add' className="sidebar-option">
                <img className='icons' src={assets.add} alt="" />
                <p>Add Products</p>
            </NavLink>
            <NavLink to='/products' className="sidebar-option">
                <img className='icons' src={assets.products} alt="" />
                <p>Products List</p>
            </NavLink>
            <NavLink to='/Customers' className="sidebar-option">
                <img className='icons' src={assets.products} alt="" />
                <p>Customers</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img className='icons' src={assets.orders} alt="" />
                <p>Orders</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
