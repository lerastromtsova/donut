import React, {ChangeEvent, useEffect, useState} from "react";
import {Button, Col, Form, Row} from "react-bootstrap";
import API from "../utils/api";
import {RouteComponentProps} from "react-router-dom";
import SBPLogo from '../sbp_logo_t.png';
import RaifLogo from '../Raiffeisen_Bank.png';
import {IUser} from "./ProfilePage";

export interface IResponse {
    code: string;
    qrId: string;
    payload: string;
    qrUrl: string;
    paymentStatus: string;
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
        window.location.href = raifFormAddress;
    }

    const [response, setResponse] = useState<IResponse | undefined>(undefined);
    const [amount, setAmount] = useState<number | undefined>(undefined);
    const [details, setDetails] = useState<string>("-");
    const [donaterNickname, setDonaterNickname] = useState<string>("Аноним");
    const [userId, setUserId] = useState<string>("");

    const currentDate = new Date();
    const orderId = Math.ceil((Math.random()* 10000)).toString();
    const streamerNickname = match.params.nickname;

    useEffect(() => {
        API
            .get<IUser>("/donate/ivan55off")
            .then(response => {
                const {data} = response;
                setAmount(data.min_donation);
                setUserId(data.id);
            })
            .catch(ex => {console.log(ex)});
    }, []);

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

    useEffect(() => {
        const interval = setInterval(() => {
            API
                .get<IResponse>(
                    "https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/"
                        +response?.qrId
                        +"/payment-info",
                    {
                        headers:
                            {
                                Authorization:
                                    "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJNQTYwMzM3NCIsImp0aSI6ImJhNGYyMDFhLWFiN2UtNDJkMS05MGUzLTBhNzFhMzU4YjZkMiJ9.5iv6IDeVXQI7O1_5gWxz0N0jWY-oeCekxi4AJviB-7I"
                            }
                    }
                )
                .then(r => {
                    console.log(r);
                    if (r.data.paymentStatus==="SUCCESS") {
                        createDonut()
                        window.location.href = "https://donut-sbp-app.herokuapp.com/success"
                        clearInterval(interval)
                    }
                })
                .catch(ex => {console.log(ex)})
        }, 5000)
        return () => clearInterval(interval)
    }, [response]);

    function createDonut() {
        const data = {
            streamer_id: userId,
            name: donaterNickname,
            text: details,
            amount: amount
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
    }


    return (<div>
            <h3>Задонатить {streamerNickname} 🤗</h3>
            <Form className="border p-4">
                <Form.Group as={Row}>
                    <Form.Label column>
                        Представься
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={donaterNickname}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setDonaterNickname(e.target.value)}}
                            placeholder="Твой никнейм"/>
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column>
                        Сумма доната
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={amount?.toString()}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setAmount(parseInt(e.target.value))}}
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
                            placeholder="Скажи всё, что думаешь!"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setDetails(e.target.value)}}
                        />
                    </Col>
                </Form.Group>
                <small>Открой камеру и наведи её на QR-код.<br/>Или просто тапни его, если сидишь с телефона.</small>
                <Row className="align-items-center">
                    <Col>
                        <a href={response?.payload}>
                            <img
                                src={response?.qrUrl}
                                alt="qr-code"
                            />
                        </a>
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
