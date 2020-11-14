import React, {ChangeEvent, useEffect, useState} from "react";
import {Alert, Col, Form, Row} from "react-bootstrap";
import API from "../utils/api";
import {BiLink} from "react-icons/bi";

export interface IUser {
    id: number;
    nickname: string;
    min_donation: number;
    account: string;
}

function ProfilePage() {

    const [id, setId] = useState<number>(0);
    const [realNickname, setRealNickname] = useState<string>("");
    const [nickname, setNickname] = useState<string>("");
    const [amount, setAmount] = useState<number>(0);
    const [account, setAccount] = useState<string>("");

    useEffect(() => {
        API
            .get<IUser>("/donate/ivan55off")
            .then(response => {
                const {data} = response;
                setNickname(data.nickname);
                setAmount(data.min_donation);
                setAccount(data.account);
                setRealNickname(data.nickname)
                setId(data.id);
                // setUser(data);
                console.log(data);
            })
            .catch(ex => {console.log(ex)});
    }, []);

    function changeProfile() {
        const newUser = {
            id: id,
            nickname: nickname,
            min_donation: amount,
            account: account
        }
        API
            .post(`/donate/${realNickname}`, newUser)
            .then(response => {
                setRealNickname(nickname);
            })
            .catch(ex => {console.log(ex)});
    }

    return (<div>
                <h2 className="mb-4">Личный кабинет</h2>
                <Form.Group as={Row}>
                    <Form.Label column>
                        Никнейм
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={nickname}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setNickname(e.target.value)}}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column>
                        Минимальная сумма доната
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={amount}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                setAmount(parseFloat(e.target.value))
                            }}
                        />
                    </Col>
                </Form.Group>
                <Form.Group as={Row}>
                    <Form.Label column>
                        Номер аккаунта
                    </Form.Label>
                    <Col>
                        <Form.Control
                            value={account}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {setAccount(e.target.value)}}
                        />
                    </Col>
                </Form.Group>


                <button className="btn btn-primary" onClick={changeProfile}>Сохранить изменения</button>
                <Alert variant="info" className="mt-3 mb-3">
                    <Row className="align-items-center">
                        <Col lg={2}>
                            <BiLink size={40}/>
                        </Col>
                        <Col>
                            <p>Твоя персональная ссылка для доната: <br/>
                                <a href={"https://donut-sbp-app.herokuapp.com/donate_to/"+nickname} className="alert-link">
                                    https://donut-sbp-app.herokuapp.com/donate_to/{nickname}
                                </a>.
                            <br/>Прикрепи её в комментариях под стримом и получай донаты через СБП!</p>
                        </Col>
                    </Row>
                </Alert>
            </div>)
}

export default ProfilePage
