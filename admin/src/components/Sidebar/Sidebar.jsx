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
                <p>Products</p>
            </NavLink>
            <NavLink to='/customers' className="sidebar-option">
                <img className='icons' src={assets.products} alt="" />
                <p>Customers</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img className='icons' src={assets.orders} alt="" />
                <p>Purchases</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img className='icons' src={assets.orders} alt="" />
                <p>Payment</p>
            </NavLink>
            <NavLink to='/orders' className="sidebar-option">
                <img className='icons' src={assets.orders} alt="" />
                <p>Sales Record</p>
            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar
