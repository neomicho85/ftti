import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import logo from '../../styles/images/ftti-logo.svg';
import './navbar.scss';

export default function Navbar() {
    return (
        <header className=" border-bottom">
            <nav className="navbar navbar-expand-sm navbar-light bg-white container  py-0" id="main-navbar">
                <Link className="navbar-brand p-0" to="/">
                    <img src={logo} width="64" height="64" className="d-inline-block align-top" alt="FTTI." />
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavDropdown"
                    aria-controls="navbarNavDropdown"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link text-uppercase" to="/dashboard">
                                Dashboard
                                <span className="sr-only">(current)</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link text-uppercase" to="/import">
                                Import
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}
