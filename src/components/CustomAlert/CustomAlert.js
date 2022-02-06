import React, { Component, useEffect, useState } from "react";
import { Alert } from "react-bootstrap";
function CustomAlert(props) {
    const [show, setShow] = useState(true);

    if (show) {
        return (
            <Alert variant={props.type} onClose={() => setShow(false)} dismissible>
                <h5>
                    {props.message}
                </h5>
            </Alert>
        );
    }
    return <div></div>;
}

export default CustomAlert;