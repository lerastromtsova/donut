import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import "./App.css"

import Sidebar from "./components/Sidebar";
import ProfilePage from "./pages/ProfilePage";
import DonateLinkPage from "./pages/DonateLinkPage";
import GoalsPage from "./pages/GoalsPage";
import NotificationsPage from "./pages/NotificationsPage";
import StatsPage from "./pages/StatsPage";
import DonateFormPage from "./pages/DonateFormPage";

function App() {
  return (
      <div className="wrapper d-flex align-items-stretch">
          <Sidebar/>
          <div className="main p-4 p-md-5 pt-5">
              <Switch>
                  <Route path='/profile' component={ProfilePage} />
                  <Route exact path='/donate' component={DonateLinkPage} />
                  <Route exact path='/goals' component={GoalsPage} />
                  <Route exact path='/notifications' component={NotificationsPage} />
                  <Route exact path='/stats' component={StatsPage} />
                  <Route path='/donate_to' component={DonateFormPage} />
                  <Redirect to='/' />
              </Switch>
          </div>
      </div>
  );
}

export default App;
