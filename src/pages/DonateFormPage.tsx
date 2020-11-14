import React from "react";
import {Col, Form, Row} from "react-bootstrap";

function DonateFormPage() {
    return <Form>
        <Form.Group as={Row} controlId="formPlaintextEmail">
            <Form.Label column sm="2">
                Никнейм стримера
            </Form.Label>
            <Col sm="10">
                <Form.Control plaintext readOnly defaultValue="тест" />
            </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formPlaintextPassword">
            <Form.Label column sm="2">
                Номер карты
            </Form.Label>
            <Col sm="10">
                <Form.Control placeholder="Номер карты" />
            </Col>
        </Form.Group>
    </Form>
}

export default DonateFormPage
