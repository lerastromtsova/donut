import React, {useEffect, useState} from "react";
import API from "../utils/api";
import {RouteComponentProps} from "react-router-dom";

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
        API
            .get<IDonate>("/lastdonat?token=O8re-gOg_Weqk0PFIurR_xQKkmg")
            .then(response => {
                const {data} = response;
                setDonat(data);
                console.log(data);
            })
            .catch(ex => {console.log(ex)});
    }, []);


    const donateItem =
        <div className="card mt-2">
            <div className="card-body">
                <h5 className="card-title">{donat?.name}</h5>
                <p className="card-text">{donat?.amount} руб.</p>
                <p className="card-text donate-text">
                    {donat?.text}
                </p>
            </div>
        </div>;

    return (
        <div>
            <h2 className="mb-4">Уведомления</h2>
            { donateItem }
        </div>
    )
}

export default LastDonationPage;
