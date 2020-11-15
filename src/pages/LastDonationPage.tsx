import React, {useEffect, useState} from "react";
import API from "../utils/api";
import {RouteComponentProps} from "react-router-dom";

import "./LastDonationPage.css";

export interface IDonate {
    id: number,
    name: string,
    streamer: number,
    text: string,
    amount: string
}

type TParams = { token: string };

function LastDonationPage({match}: RouteComponentProps<TParams>) {

    const [donat, setDonat] = useState<IDonate|undefined>(undefined);

    useEffect(() => {
        const interval = setInterval(() => {
        API
            .get<IDonate>("/lastdonat?token=O8re-gOg_Weqk0PFIurR_xQKkmg")
            .then(response => {
                const {data} = response;
                setDonat(data);
                console.log(data);
            })
            .catch(ex => {console.log(ex)});}
        , 10000)
            return () => clearInterval(interval)
    }, []);


    const donateItem =
        <div className="mt-2">
            <img alt="cat" src="https://i.gifer.com/18Pe.gif"/>
            <p className="donat-title">
                <span className="donat-name">{donat?.name}</span> задонатил <span className="donat-amount">{donat?.amount} руб.</span>
            </p>
            <p className="donate-msg">
                {donat?.text}
            </p>
        </div>;

    return (
        <div>
            { donat?.amount?
                <div>
                    {donateItem}
                </div>
                :null}
        </div>
    )
}

export default LastDonationPage;
