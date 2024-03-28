import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';

export default function ContactModal() {
    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [validName, setValidName] = useState(true);
    const [validSubject, setValidSubject] = useState(true);
    const [validMessage, setValidMessage] = useState(true);
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    const sendEmail = () => {
        const encodedSubject = encodeURIComponent(subject);
        const encodedBody = encodeURIComponent(
            message + '\n\nSent by: ' + name);
        window.location.href = (
            `mailto:istiaque.ony@gmail.com?
            subject=${encodedSubject}&body=${encodedBody}`);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (name === '') {
            setValidName(false);
        } else {
            setValidName(true);
        }
        if (subject === '') {
            setValidSubject(false);
        } else {
            setValidSubject(true);
        }
        if (message === '') {
            setValidMessage(false);
        } else {
            setValidMessage(true);
        }
        if (!(name === '') || !(subject === '') || !(message === '')) {
            console.log('Sending email...');
            sendEmail();
            handleClose();
        }
    }

    return (
        <>
            <Modal show={show}>
                <Modal.Header>
                    <Modal.Title>Contact Us</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <Form.Group controlId="name">
                            <Form.Label
                            style={{
                                color: "black",
                                textShadow: "2px 2px 4px #FFFFFF",
                            }}>Name</Form.Label>
                            <Form.Control
                                type="username"
                                isInvalid={!validName}
                                value={name}
                                placeholder='Name'
                                onChange={(e) => setName(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide your name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="subject">
                            <Form.Label
                            style={{
                                color: "black",
                                textShadow: "2px 2px 4px #FFFFFF",
                            }}>Subject</Form.Label>
                            <Form.Control 
                                type="username"
                                isInvalid={!validSubject}
                                value={subject}
                                placeholder='Subject'
                                onChange={(e) => setSubject(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a subject.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group controlId="message">
                            <Form.Label
                            style={{
                                color: "black",
                                textShadow: "2px 2px 4px #FFFFFF",
                                marginBottom: "-0.2em",
                            }}>Message</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                isInvalid={!validMessage}
                                value={message}
                                placeholder='Message'
                                onChange={(e) => setMessage(e.target.value)} />
                            <Form.Control.Feedback type="invalid">
                                Please provide a message.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form>
                    <Row>
                        <Col>
                            <Button variant="secondary" onClick={handleClose}
                            style={{
                                float: "right",
                                width: "12em",
                            }}>
                                Close
                            </Button>
                        </Col>
                        <Col>
                            <Button variant="primary" onClick={(e) => handleSubmit(e)}
                            style={{
                                float: "left",
                                width: "12em",
                            }}>
                                Submit Message
                            </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    )
    }