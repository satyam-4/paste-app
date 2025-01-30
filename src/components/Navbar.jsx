import React from 'react'
import { NavLink } from 'react-router-dom'
import "./components.css"

const Navbar = () => {
  return (
    <div className="pt-14 flex justify-center gap-36 text-[1.8rem] font-bold font-sans">
        <NavLink to="/" className={({isActive}) => isActive ? "active-link" : "inActive-link"}>
            Home
        </NavLink>
        <NavLink to="/pastes" className={({isActive}) => isActive ? "active-link" : "inActive-link"}>
            Pastes
        </NavLink>
    </div>
  )
}

export default Navbar