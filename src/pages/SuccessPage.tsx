import React from "react";
import {Row, Col} from "react-bootstrap";


function SuccessPage() {
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
