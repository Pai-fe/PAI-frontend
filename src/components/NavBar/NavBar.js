import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import * as FaIcons from "react-icons/fa"
import * as AiIcons from "react-icons/ai"
import logo from './images/logo.png'
import homeImg from './images/home.png'
import userImg from './images/user.png'
import faImg from './images/FA.png'


import './NavBar.css'

const NavBar = ({ user }) => {
    console.log(user, 'testbest aaa');
    const [sidebar, setSidebar] = useState(false)
    const [sidebarData, setSidebarData] = useState([
        {
            title: 'Home',
            path: '/',
            image: homeImg,
            cName: 'nav-text'
        }
    ])

    const showSidebar = () => {
        setSidebar(!sidebar)
    }

    useEffect(() => {
        if(user?.uloga === 'Admin'){
            setSidebarData([
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
                },
                {
                    title: 'FA',
                    path: 'fas/list-view',
                    image: faImg,
                    cName: 'nav-text'
                }
            ]);
        } else {
            setSidebarData([
                {
                    title: 'Home',
                    path: '/',
                    image: homeImg,
                    cName: 'nav-text'
                }
            ]);
        }
    }, [user]);

    return (
        <div className="navbar-wrapper">
            {user?.uloga && (<div className="navbar">
                <Link to="#" className='menu-bars'>
                    <FaIcons.FaBars onClick={showSidebar}/>
                </Link>
            </div>)}
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
