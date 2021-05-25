import React, {useState} from 'react';
import {Link} from "react-router-dom";
import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import logo from './images/logo.png'
import homeImg from './images/home.png'
import userImg from './images/user.png'


import './NavBar.css'

function NavBar() {
    const [sidebar, setSidebar] = useState(false)

    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    const sidebarData = [
        {
            title: 'Home',
            path: '/',
            image: homeImg,
            cName: 'nav-text'
        },
        {
            title: 'Users',
            path: '/users',
            image: userImg,
            cName: 'nav-text'
        }
    ]

    return (
        <div className="navbar-wrapper">
            <div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>
            <div className='logo'>
                <img src={logo}/>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-close'>
                            <AiIcons.AiOutlineClose />
                        </Link>
                    </li>
                    {sidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    <div className='meni-icons'>
                                        <img  src={item.image}/>
                                    </div>
                                    <span className='item-span'>{item.title}</span>
                                </Link>
                            </li>
                            
                        )
                    })}
                </ul>
            </nav>

            
            
            
        </div>
    )
}

export default NavBar;
