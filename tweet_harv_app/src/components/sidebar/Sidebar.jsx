import React, { useState, useEffect }  from 'react'
import {SidebarData} from './SidebarData'
import {Link} from 'react-router-dom';
import './Sidebar.css'
import { flexbox } from '@mui/system';
import logo from '../../images/logo4.png';

function Sidebar() {
    const [active, setActive] = useState(); 
    const [subactive, setsubactive] = useState(); 


  return (
    <div className='sidebar-container'>
      <img src={logo} alt='logo' width="100%"/>
        <ul className='sidebar-list'>
            {SidebarData.map((item,key)=>{
            return(
            <li key={key} className="nav-item"
              id={active === key ? "active" : ""} >
                <Link to={item.link} className="nav-link"
                style={{ textDecoration: 'none' }}
                onClick={()=>{
                  if (active === key) {
                      // change active to blank
                      setActive();
                    } else {
                      // change active to current index
                      setActive(key);
                      setsubactive();
                    }
              }}>
                    <div id="icon">{item.icon}</div>
                    <div id="title">{item.title}</div>
                    <div id="arrow">{item.subNav && (active=== key) ? item.iconDown : 
                    item.subNav? item.iconRight : null}</div>
                </Link>
                
                {(active===key) && item.subNav && item.subNav.map((subitem,subkey) =>{
                    return(
                      <li key={subkey} className="sub-item" id={(subactive===subkey) ? "subactive" : ""}>
                        <Link to={subitem.link} className="sub-link" 
                          style={{ textDecoration: 'none' }} 
                          onClick={()=>{
                            if (subactive === subkey) {
                                // change active to blank
                                setsubactive();
                            } else {
                                // change active to current index
                                setsubactive(subkey);
                            }
                          }}>
                            <div id="icon">{subitem.icon}</div>
                            <div id="title">{subitem.title}</div>
                        </Link>
                      </li>
                    )
                })}
            </li>

            )})}
        </ul>
    </div>
  )
}

export default Sidebar;