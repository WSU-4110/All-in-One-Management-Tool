import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';

export default function ConfigureProfile() {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const navigate = useNavigate();

    function handleSubmit() {
        handleClose();
        navigate('/profile');
    }

    return (
        <>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title
                    style={{
                        color: "black",
                    }}>Configure Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>More information is needed to make your experience better</p>
                    <Row>
                        <Col>
                            <Button variant="secondary" onClick={handleClose}
                            style={{
                                float: "right",
                                width: "8em",
                            }}>
                                Close
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={handleSubmit}
                            style={{
                                float: "left",
                                width: "8em",
                            }}>
                                Go to Profile
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
    }