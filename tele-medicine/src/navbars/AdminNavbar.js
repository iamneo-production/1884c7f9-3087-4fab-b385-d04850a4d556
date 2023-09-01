
import { Link } from 'react-router-dom';
import { useState } from 'react';
import LogoutButton from './LogoutButton';

export const AdminNavbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

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
                    TeleMedico App Admin
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
                            <Link className="nav-link" to="/admin">
                                Home
                            </Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a
                                className="nav-link dropdown-toggle"
                                href="#"
                                onClick={handleDropdownClick}
                            >
                                Admin CRUD
                            </a>
                            <ul
                                className={`dropdown-menu ${showDropdown ? 'show' : ''}`}
                                aria-labelledby="navbarDropdown"
                            >
                                <li>
                                    <Link className="dropdown-item" to="/addDoctor">
                                        Add Doctor
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/viewAllDoctors">
                                        View All Doctors
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/viewAllPatients">
                                        View All Patients
                                    </Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" to="/timeSlotManagement">
                                        Time Slot Management
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
                <LogoutButton/>
            </div>
        </nav>
    );
}

export default AdminNavbar