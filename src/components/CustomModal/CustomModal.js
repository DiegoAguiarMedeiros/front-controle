import React, { Component, useEffect, useState } from "react";
import { Button,Modal } from "react-bootstrap";
import CustomForm from "../CustomForm/CustomForm"
function CustomModal(props) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                {props.modalTitle}
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <CustomForm form={props.form} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={e => {props.action(); handleClose()}}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default CustomModal;
