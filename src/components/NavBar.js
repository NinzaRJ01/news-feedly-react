import {NavLink} from 'react-router-dom';
import BRAND_LOGO from '../assets/images/logos/brand-logo.png'
import "./components-styles/NavBar.css"
function NavBar(){
    return (
        <div className="navbar navbar-expand-sm  bg-mad-blue">
            <div className = "container-fluid">
                <div className="navbar-brand text-white pointer">
                   <img
                    className= "fade-on-hover"
                    src = {BRAND_LOGO}
                   />
                   <span className="px-3 fw-bold h3 fade-on-hover">NewsFeeding.com</span>
                </div>
                <div className="collapse navbar-collapse">
                    <div className="ms-auto profile-btn me-2 pointer fade-on-hover">
                        <div className="circle bg-white fw-bold h4 d-flex justify-content-center align-items-center">
                            R
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default NavBar;