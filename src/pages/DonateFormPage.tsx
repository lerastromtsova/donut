import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import API from "../utils/api";
import {RouteComponentProps} from "react-router-dom";
import SBPLogo from '../sbp_logo_t.png' ;
import RaifLogo from '../Raiffeisen_Bank.png' ;

export interface IResponse {
    code: string;
    qrId: string;
    payload: string;
    qrUrl: string;
}

type TParams = { nickname: string };

function DonateFormPage({match}: RouteComponentProps<TParams>) {

    const [response, setResponse] = useState<IResponse | undefined>(undefined);
    const currentDate = new Date;
    const orderId = Math.random().toString();
    const streamerNickname = match.params.nickname;

    const [amount, setAmount] = useState<number>(10);
    const [details, setDetails] = useState<string>("");

    useEffect(() => {
        API
            .post<IResponse>(
                "https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/register",
                {
                    'amount': amount,
                    createDate: currentDate,
                    currency: "RUB",
                    order: orderId,
                    paymentDetails: details,
                    qrType: "QRDynamic",
                    sbpMerchantId: "MA603374"
                }
            )
            .then(response => {
                const {data} = response;
                setResponse(data);
            })
            .catch(ex => {console.log(ex)});
    }, [amount, details]);

    return (<div>
            <h3>Оплатить через СБП</h3>
            <small>Откройте камеру и наведите ее на QR-код.</small>
            <Form className="border p-4">
                <Form.Group as={Row}>
                    <Form.Label column>
                        Никнейм стримера
                    </Form.Label>
                    <Col>
                        <Form.Control plaintext readOnly defaultValue={streamerNickname} />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column>
                        Сумма доната
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={amount}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setAmount(parseFloat(e.target.value))}}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column>
                        Сообщение
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={details}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setDetails(e.target.value)}}
                        />
                    </Col>
                </Form.Group>
                <Row>
                    <Col>
                        <img
                            src={response?.qrUrl}
                            alt="qr-code"
                        />
                    </Col>
                    <Col>
                        <img
                            src={SBPLogo}
                            alt="SBP"
                            height={60}
                        />
                        <img
                            src={RaifLogo}
                            alt="SBP"
                            height={50}
                        />
                    </Col>
                </Row>
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
