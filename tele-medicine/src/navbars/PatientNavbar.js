
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoutButton from "./LogoutButton";



export const PatientNavbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    // const navigate = useNavigate();

    // const handleLogout = () => {
      
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
                    TeleMedico App Patient
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    onClick={handleMenuClick}
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${showMenu ? 'show' : ''}`}>
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/patient">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                onClick={handleDropdownClick}
                            >
                                Patient Operations
                            </a>
                            <ul
                                className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <Link className="dropdown-item" to="/slotBooking">
                                        Slot Bokking
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/viewPatientProfile">
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/viewPatientAppointments">
                                        View Status of Appointments
                                    </Link>
                                </li>
                            </ul>
                        </li>
                       
                        


                        <li className="nav-item">
                            <Link className="nav-link" to="/about">
                                About
                            </Link>
                        </li>
                    </ul>
                  
                </div>
                 <div>
                    {/* <button
                        className="btn btn-primary"
                        onClick={handleLogout}
                    >
                        Logout
                    </button> */}
                    <LogoutButton/>
                </div>
            </div>
        </nav>
    );
}

export default PatientNavbar