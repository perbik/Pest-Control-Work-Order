import React, { useState } from 'react'
import './NavBar.css'
import searchIcon from '../../assets/search_icon.png';
import cartIcon from '../../assets/cart_icon.png';

const NavBar = () => {

    const [menu,setMenu] = useState("Home");

  return (
    <div className='navbar'>
      <h2>Uno Pest Co.</h2>
      <ul className='navbar-menu'>
        <li onClick={()=>setMenu("Home")} className={menu==="Home"?"active":""}>Home</li>
        <li onClick={()=>setMenu("Menu")} className={menu==="Menu"?"active":""}>Menu</li>
        <li onClick={()=>setMenu("About")} className={menu==="About"?"active":""}>About</li>
      </ul>
      <div className="navbar-right">
        <img src={searchIcon} alt=''/>
        <div className="navbar-search-icon">
          <img src={cartIcon} alt=''/>
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
  )
}

export default NavBar
