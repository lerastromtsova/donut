import React from 'react';

import Nav from "react-bootstrap/Nav";
import { BiHomeAlt } from "react-icons/bi"
import { BiLink } from "react-icons/bi"
import { BiBarChartAlt2 } from "react-icons/bi"
import { BiBell } from "react-icons/bi"
import { BiBullseye } from "react-icons/bi"
import { BiPhone } from "react-icons/bi"

import "./App.css"

function App() {
  return (
      <div className="wrapper d-flex align-items-stretch">
          <Nav id="sidebar" className="active">
              <div className="p-4">
                  <h1><a href="index.html" className="logo">Donut</a></h1>
                  <ul className="list-unstyled components mb-5">
                      <li className="active">
                          <a href="#"><BiHomeAlt className="mr-3"/>Личный кабинет</a>
                      </li>
                      <li>
                          <a href="#"><BiLink className="mr-3"/>Персональная ссылка</a>
                      </li>
                      <li>
                          <a href="#"><BiBullseye className="mr-3"/>Цели</a>
                      </li>
                      <li>
                          <a href="#"><BiBell className="mr-3"/>Уведомления</a>
                      </li>
                      <li>
                          <a href="#"><BiBarChartAlt2 className="mr-3"/>Статистика</a>
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

          <div id="content" className="p-4 p-md-5 pt-5">
              <h2 className="mb-4">Личный кабинет</h2>
          </div>
      </div>
  );
}

export default App;
