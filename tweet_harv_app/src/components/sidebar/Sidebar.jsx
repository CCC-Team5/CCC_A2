import React, { useState, useEffect }  from 'react'
import {SidebarData} from './SidebarData'
import {Link} from 'react-router-dom';
import './Sidebar.css'

function Sidebar() {
    const [active, setActive] = useState(); 

  return (
    <div className='sidebar-container'>
        <ul className='sidebar-list'>
            {SidebarData.map((val,key)=>{
            return(
                <li key={key} className="nav-item" >
                <Link to={val.link} className="nav-link" 
                style={{ textDecoration: 'none' }}
                onClick={()=>{
                    if (active === key) {
                        // change active to blank
                        setActive();
                      } else {
                        // change active to current index
                        setActive(key);
                      }
                }}
                id={active === key ? "active" : ""}>
                    <div id="icon">{val.icon}</div>
                    <div id="title">{val.title}</div>
                </Link>
            </li>
            )})}
        </ul>
    </div>
  )
}

export default Sidebar;