import React, { useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import underline from '../assets/nav_underline.svg'
import AnchorLink from 'react-anchor-link-smooth-scroll'
import meu_open from '../assets/menu_open.svg'
import meu_close from '../assets/menu_close.svg'

const Navbar = () => {

    const [menu, setMenu] = useState("home");


    const menuRef = useRef();

    const openMenu =() => {
        menuRef.current.style.right="0";
    }

    const closeMenu =() => {
        menuRef.current.style.right="-350px";
    }

    return (
        <div className='navbar'>
            <img src={logo} alt="" />
            <img src={meu_open} onClick={openMenu} alt="" className='nav-mob-open' />

            <ul ref={menuRef} className='nav-menu'>
                <img src={meu_close} onClick={closeMenu} alt="" className="nav-mob-close" />

                <li><AnchorLink className='anchor-link' offset={50} href='#home'> <p onClick={()=>setMenu("home")}>Home</p></AnchorLink>{menu === "home" ? <img src={underline} alt='' /> : <></>} </li>
                <li><AnchorLink className='anchor-link' offset={50} href='#about'> <p onClick={()=>setMenu("about")}>About Me</p></AnchorLink>{menu === "about" ? <img src={underline} alt='' /> : <></>} </li>
                <li><AnchorLink className='anchor-link' offset={50} href='#services'> <p onClick={()=>setMenu("services")}>Services</p></AnchorLink>{menu === "services" ? <img src={underline} alt='' /> : <></>} </li>
                <li><AnchorLink className='anchor-link' offset={50} href='#work'> <p onClick={()=>setMenu("portfolio")}>Portfolio</p></AnchorLink>{menu === "portfolio" ? <img src={underline} alt='' /> : <></>} </li>
                <li><AnchorLink className='anchor-link' offset={50} href='#contact'> <p onClick={()=>setMenu("contact")}>Contact Us</p></AnchorLink>{menu === "contact" ? <img src={underline} alt='' /> : <></>} </li>
            </ul>

            <div className="nav-connect"> <AnchorLink className='anchor-link' offset={50} href='#contact'> Connect with me </AnchorLink></div>
        </div>
    )
}

export default Navbar
