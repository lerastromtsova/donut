import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import API from "../utils/api";
import {RouteComponentProps} from "react-router-dom";
import SBPLogo from '../sbp_logo_t.png';
import RaifLogo from '../Raiffeisen_Bank.png';

export interface IResponse {
    code: string;
    qrId: string;
    payload: string;
    qrUrl: string;
}

type TParams = { nickname: string };

function DonateFormPage({match}: RouteComponentProps<TParams>) {

    const redirectToRaifForm = () => {
        const params = {
            publicId: "000003333328006-33328006",
            'amount': amount,
            orderId: orderId,
            successUrl: "https://donut-sbp-app.herokuapp.com/success",
            failUrl: "https://donut-sbp-app.herokuapp.com"
        }
        const raifFormAddress =
            'https://test.ecom.raiffeisen.ru/pay?' +
            // @ts-ignore
            Object.keys(params).map(key => key + '=' + params[key]).join('&');
        console.log(raifFormAddress);
        window.location.href = raifFormAddress;
    }

    const [response, setResponse] = useState<IResponse | undefined>(undefined);
    const currentDate = new Date;
    const orderId = Math.ceil((Math.random()* 10000)).toString();
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
            <h3>Задонатить {streamerNickname} 🤗</h3>
            <Form className="border p-4">
                <Form.Group as={Row}>
                    <Form.Label column>
                        Представься
                    </Form.Label>
                    <Col>
                        <Form.Control value="" placeholder="Ник"/>
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
                <small>Открой камеру и наведи её на QR-код.</small>
                <Row className="align-items-center">
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
                <h6 className=" text-center m-4">или</h6>
                <Button className="w-100" onClick={redirectToRaifForm}>Оплати по данным карты 💳</Button>
            </Form>
        </div>)
}


export default DonateFormPage
