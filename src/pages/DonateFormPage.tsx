import React from "react";
import {Button, Col, Form, Row} from "react-bootstrap";

function DonateFormPage() {
    return (
        <Form>
            <Form.Group as={Row}>
                <Form.Label column>
                    Никнейм стримера
                </Form.Label>
                <Col>
                    <Form.Control plaintext readOnly defaultValue="тест" />
                </Col>
            </Form.Group>

            <Form.Group as={Row}>
                <Form.Label column>
                    Номер карты
                </Form.Label>
                <Col>
                    <Form.Control placeholder="0000 0000 0000 0000" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column>
                    Месяц/Год
                </Form.Label>
                <Col>
                    <Form.Control placeholder="MM/YY" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column>
                    CVV2
                </Form.Label>
                <Col>
                    <Form.Control placeholder="000" />
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column>
                    Сумма доната
                </Form.Label>
                <Col>
                    <Form.Control placeholder="10" />
                </Col>
            </Form.Group>
            <Button className="w-100">Оплатить</Button>
        </Form>)
}

export default DonateFormPage
