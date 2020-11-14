import React, {ChangeEvent, useEffect, useState} from "react";
import { Col, Form, Row } from "react-bootstrap";
import FormImpl from "react-bootstrap/esm/Form";
import API from "../utils/api";

export interface IUser {
    id: number;
    nickname: string;
    min_donation: number;
    account: string;
}

function ProfilePage() {
    const [user, setUser] = useState<IUser | undefined>(undefined);

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
            .put(`/donate/${realNickname}`, newUser)
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
                        Минимальная сумма доанта
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
            </div>)
}

export default ProfilePage
