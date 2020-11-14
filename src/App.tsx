import React from 'react';
import {Route, Switch} from 'react-router-dom';

import StreamerPage from "./pages/StreamerPage";
import DonateToStreamerPage from "./pages/DonateToStreamerPage";

import "./App.css"

function App() {
  return (
      <Switch>
          <Route path='/donut/streamer' component={StreamerPage} />
          <Route path='/donut/donate_to/:nickname' component={DonateToStreamerPage} />
      </Switch>
  );
}

export default App;
