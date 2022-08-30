import {NavLink} from 'react-router-dom';
import { Link } from 'react-router-dom';
import BRAND_LOGO from '../assets/images/logos/brand-logo.png'
import "./components-styles/NavBar.css"
import React, { useState } from 'react';
function ProfileDrop(){
    return (
        <div className="profile-menu">
            <div>Profile</div>
            <div>Privacy</div>
            <div>Edit</div>
            <div>Log Out</div>
        </div>
    );
}
function NavBar(){
    let [drop,handleClick] = useState(false);

    return (
        <div className="navbar navbar-expand-sm  bg-mad-blue">
            <div className = "container-fluid">
                <div className="navbar-brand text-white pointer">
                   <Link  to ="/" className="link">
                   <img
                    className= "fade-on-hover"
                    src = {BRAND_LOGO}
                   />
                   <span className="px-3 fw-bold h3 fade-on-hover">NewsFeeding.com</span>
                   </Link>
                </div>
                <div className="collapse navbar-collapse">
                    <div className="ms-auto profile-btn me-2 pointer fade-on-hover" onClick={()=>handleClick(!drop)}>
                        <div className="circle bg-white fw-bold h4 d-flex justify-content-center align-items-center">
                            R
                        </div>
                    </div>
                    {drop?(<ProfileDrop></ProfileDrop>):""}
                </div>
            </div>
        </div>
    );
}
export default NavBar;