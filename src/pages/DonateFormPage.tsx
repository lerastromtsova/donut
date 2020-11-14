import React, {useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import API from "../utils/api";
import {randomInt} from "crypto";

export interface IResponse {
    code: string;
    qrId: string;
    payload: string;
    qrUrl: string;
}

export interface ISBPPaymentData {
    amount: number,
    createDate: Date,
    currency: string,
    order: string,
    paymentDetails: string,
    qrType: string,
    sbpMerchantId: string
}


function DonateFormPage() {

    const [response, setResponse] = useState<IResponse | undefined>(undefined);
    const currentDate = new Date;
    const orderId = Math.random().toString();

    const [SBPPaymentData, setSBPPaymentData ] = useState<ISBPPaymentData | undefined>(
        {
            amount: 10,
            createDate: currentDate,
            currency: "RUB",
            order: orderId,
            paymentDetails: "test",
            qrType: "QRDynamic",
            sbpMerchantId: "MA603374"
        }
    );

    useEffect(() => {
        API
            .post<IResponse>(
                "https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/register",
                SBPPaymentData
            )
            .then(response => {
                const {data} = response;
                setResponse(data);
            })
            .catch(ex => {console.log(ex)});
    }, []);

    return (<div>
            <h3>Оплатить через СБП</h3>
            <small>Откройте камеру и наведите ее на QR-код.</small>
            <Form className="border p-4">
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
                        Сумма доната
                    </Form.Label>
                    <Col>
                        <Form.Control placeholder="10" />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column>
                        Сообщение
                    </Form.Label>
                    <Col>
                        <Form.Control placeholder="10" />
                    </Col>
                </Form.Group>
                <Button className="w-100">Сгенерировать QR</Button>
                <img
                    src={response?.qrUrl}
                    alt="new"
                />
            </Form>
            <h3>Оплатить через e-commerce</h3>
            <Form className="border p-4">
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
            </Form>
        </div>)
}

export default DonateFormPage
