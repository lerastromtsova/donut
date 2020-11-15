import React, {ChangeEvent, useEffect, useState} from "react";
import API from "../utils/api";
import {Col, Row} from "react-bootstrap";

export interface IDonate {
    id: number,
    name: string,
    streamer: number,
    text: string,
    amount: string,
    create_date: string
}

function StatsPage() {

    const [donates, setDonates] = useState<Array<IDonate>>([]);

    useEffect(() => {
        API
            .get<Array<IDonate>>("/alldonation?id=1")
            .then(response => {
                const {data} = response;
                setDonates(data.reverse());
            })
            .catch(ex => {console.log(ex)});
    }, []);


    const donateItems = donates.map((donate, index) =>
        <div className="card mt-2">
            <div className="card-body">
                <h5 className="card-title">{donate.name}</h5>
                <p className="card-text">{donate.amount} рублей</p>
                <p className="card-text">
                    {donate.create_date.split('T')[0]}<br/>
                    {donate.create_date.split('T')[1].slice(0,8)}
                </p>
                <p className="card-text donate-text">
                    {donate.text}
                </p>
            </div>
        </div>
    );

    return (
        <>
            <h2 className="mb-4">Статистика</h2>
            <h5 className="mb-4">Донаты</h5>
            <Row className="w-100">
                <Col>
                    { donateItems }
                </Col>
            </Row>
        </>
    )
}

export default StatsPage
