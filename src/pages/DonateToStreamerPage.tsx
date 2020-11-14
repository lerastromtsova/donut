import React from 'react';
import {RouteComponentProps} from "react-router-dom";

type TParams = { nickname: string };

function DonateToStreamerPage({match}: RouteComponentProps<TParams>) {
    const streamerName = match.params.nickname;

    return (<div className="wrapper d-flex align-items-stretch">
        <div className="main p-4 p-md-5 pt-5">
            This is a page to donate to {streamerName}
        </div>
    </div>)
}

export default DonateToStreamerPage;
