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
                <ul className="list-unstyled components mb-5">
                    <li className={location.pathname === "/streamer/profile" ? "active" : ""}>
                        <Link to="/streamer/profile"><BiHomeAlt className="mr-3"/>Личный кабинет</Link>
                    </li>
                    <li className={location.pathname === "/streamer/donate" ? "active" : ""}>
                        <Link to="/streamer/donate"><BiLink className="mr-3"/>Персональная ссылка</Link>
                    </li>
                    <li className={location.pathname === "/streamer/goals" ? "active" : ""}>
                        <Link to="/streamer/goals"><BiBullseye className="mr-3"/>Цели</Link>
                    </li>
                    <li className={location.pathname === "/streamer/notifications" ? "active" : ""}>
                        <Link to="/streamer/notifications"><BiBell className="mr-3"/>Уведомления</Link>
                    </li>
                    <li className={location.pathname === "/streamer/stats" ? "active" : ""}>
                        <Link to="/streamer/stats"><BiBarChartAlt2 className="mr-3"/>Статистика</Link>
                    </li>
                </ul>

                <div className="footer">
                    <div className="mb-5">
                        <h6 className="text-white-50">Служба поддержки</h6>
                        <h5 className="text-white mb-3"><BiPhone className="mr-3"/>8 499 101 01 01</h5>
                        {/*<form action="#" className="subscribe-form">*/}
                        {/*    <div className="form-group d-flex">*/}
                        {/*        <input type="text" className="form-control" placeholder="Enter Email Address"/>*/}
                        {/*    </div>*/}
                        {/*</form>*/}
                    </div>
                </div>
            </div>
        </Nav>
    )
}

export default Sidebar;
