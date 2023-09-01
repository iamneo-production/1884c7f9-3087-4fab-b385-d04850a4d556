import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState } from 'react';

export const MainNavbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

   // const navigate = useNavigate();

    // const handleLogout = () => {
    //     // Clear local storage and navigate to login page
    //     localStorage.removeItem('currentUser');
    //     navigate('/');
    // };


    const handleMenuClick = () => {
        setShowMenu(!showMenu);
    };

    const handleDropdownClick = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    TeleMedico App
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleMenuClick}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* <div>
                    <button
                        className="btn btn-primary"
                       // onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div> */}
            </div>
        </nav>
    );
}

export default MainNavbar