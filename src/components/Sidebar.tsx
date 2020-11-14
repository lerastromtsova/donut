import React from "react";
import {Link} from "react-router-dom";
import { useLocation } from 'react-router-dom';
import Nav from "react-bootstrap/Nav";

import {BiBarChartAlt2, BiBell, BiBullseye, BiHomeAlt, BiLink, BiPhone} from "react-icons/bi";

function Sidebar() {
    const location = useLocation();

    return (
        <Nav id="sidebar" className="active">
            <div className="p-4">
                <h1><a href="/" className="logo">Donut</a></h1>
                    {location.pathname !== "/donate_to" ?
                        (
                            <ul className="list-unstyled components mb-5"><li className={location.pathname === "/profile" ? "active" : ""}>
                            <Link to="/profile"><BiHomeAlt className="mr-3"/>Личный кабинет</Link>
                        </li>
                        <li className={location.pathname === "/donate" ? "active" : ""}>
                            <Link to="/donate"><BiLink className="mr-3"/>Персональная ссылка</Link>
                        </li>
                        <li className={location.pathname === "/goals" ? "active" : ""}>
                        <Link to="/goals"><BiBullseye className="mr-3"/>Цели</Link>
                        </li>
                        <li className={location.pathname === "/notifications" ? "active" : ""}>
                        <Link to="/notifications"><BiBell className="mr-3"/>Уведомления</Link>
                        </li>
                        <li className={location.pathname === "/stats" ? "active" : ""}>
                        <Link to="/stats"><BiBarChartAlt2 className="mr-3"/>Статистика</Link>
                        </li> </ul>)
                        :
                        null
                    }

                <div className="footer">
                    <div className="mb-5">
                        <h6 className="text-white-50">Служба поддержки</h6>
                        <h5 className="text-white mb-3"><BiPhone className="mr-3"/>8 499 101 01 01</h5>
                    </div>
                </div>
            </div>
        </Nav>
    )
}

export default Sidebar;
