import React from 'react';
import {Route, Switch} from 'react-router-dom';

import StreamerPage from "./pages/StreamerPage";
import DonateToStreamerPage from "./pages/DonateToStreamerPage";

import "./App.css"

function App() {
  return (
      <Switch>
          <Route exact path='/donate_to/:nickname' component={DonateToStreamerPage} />
          <Route component={StreamerPage} />
      </Switch>
  );
}

export default App;
