import React, {useEffect} from "react";
import {Row, Col} from "react-bootstrap";
import API from "../utils/api";
import {IResponse} from "./DonateFormPage";
import {useLocation} from 'react-router-dom';

interface ParamTypes {
    streamer_id: string,
    name: string,
    text: string,
    amount: string
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function SuccessPage() {

    const query = useQuery();
    console.log('here')

    useEffect(() => {
        const data = {
            streamer_id: query.get("streamer_id"),
            name: query.get("name"),
            text: query.get("text"),
            amount: query.get("amount")
        }
        API
            .post<IResponse>(
                "/donation",
                data
            )
            .then(response => {
                console.log(response);
            })
            .catch(ex => {console.log(ex)});
    }, [])

    return (
        <Row>
            <Col>
                <img alt="cat" src="https://media.giphy.com/media/z6aolrxeAjTTG/giphy.gif"/>
            </Col>
            <Col>
                <h3>Успех!</h3>
                <p>Твой платеж проведен успешно ✅</p>
            </Col>
        </Row>
    )
}

export default SuccessPage
