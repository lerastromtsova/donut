import React from "react";
import {Alert, Col, Row} from "react-bootstrap";
import {BiLink} from "react-icons/bi";

function NotificationsPage() {
    return  (
        <div>
            <h2 className="mb-4">Уведомления</h2>
            <Alert variant="info" className="mt-3 mb-3">
                <Row className="align-items-center">
                    <Col lg={2}>
                        <BiLink size={40}/>
                    </Col>
                    <Col>
                        <p>Скопируй ссылку на виджет уведомлений<br/>
                            <a
                                href={"https://donut-sbp-app.herokuapp.com/lastdonation/ivan55off"}
                                className="alert-link"
                                target="_blank">
                                https://donut-sbp-app.herokuapp.com/donate_to/lastdonation/ivan55off
                            </a>
                            <br/>В настройки на стриминговой платформе и получай уведомления в прямом эфире!</p>
                    </Col>
                </Row>
            </Alert>
        </div>
    )
}

export default NotificationsPage
