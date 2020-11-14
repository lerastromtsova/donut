import React from 'react';
import Sidebar from "../components/Sidebar";
import {Route, Switch, RouteComponentProps} from "react-router-dom";
import ProfilePage from "./ProfilePage";
import DonateLinkPage from "./DonateLinkPage";
import GoalsPage from "./GoalsPage";
import NotificationsPage from "./NotificationsPage";
import StatsPage from "./StatsPage";

type TParams = { id: string };

function StreamerPage({match}: RouteComponentProps<TParams>) {
    return (<div className="wrapper d-flex align-items-stretch">
        <Sidebar/>
        <div className="main p-4 p-md-5 pt-5">
            <Switch>
                <Route exact path={match.url +'/profile'} component={ProfilePage} />
                <Route exact path={match.url +'/donate'} component={DonateLinkPage} />
                <Route exact path={match.url +'/goals'} component={GoalsPage} />
                <Route exact path={match.url +'/notifications'} component={NotificationsPage} />
                <Route exact path={match.url +'/stats'} component={StatsPage} />
            </Switch>
        </div>
    </div>)
}

export default StreamerPage;
