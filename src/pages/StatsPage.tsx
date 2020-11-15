import React, {ChangeEvent, useEffect, useState} from "react";
import API from "../utils/api";

export interface IDonate {
    id: number,
    name: string,
    streamer: number,
    text: string,
    amount: string
}

function StatsPage() {

    const [donates, setDonates] = useState<Array<IDonate>>([]);

    useEffect(() => {
        API
            .get<Array<IDonate>>("/alldonation?id=1")
            .then(response => {
                const {data} = response;
                setDonates(data);
                console.log(data.reverse);
            })
            .catch(ex => {console.log(ex)});
    }, []);


    const donateItems = donates.map((donate, index) =>
        <div className="card mt-2">
            <div className="card-body">
                <h5 className="card-title">{donate.name}</h5>
                <p className="card-text">{donate.amount} рублей</p>
                <p className="card-text donate-text">
                    {donate.text}
                </p>
            </div>
        </div>
    );

    return (
        <div>
            <h2 className="mb-4">Статистика</h2>
            <h2 className="mb-4">Донаты</h2>
            { donateItems }
        </div>
    )
}

export default StatsPage
