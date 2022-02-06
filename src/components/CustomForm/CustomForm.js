import React, { Component } from "react";
import { Form } from "react-bootstrap";
import loading from '../../assets/img/loading.gif'; // with import
class CustomForm extends Component {


    setFormComponent = (form) => {


        if (form.type == 'select') {
            return <Form.Group className={form.className} controlId={form.controlId} key={form.key}>
                <Form.Label>{form.label}</Form.Label>
                <Form.Control as="select" aria-label="Default select example">
                    <option>{form.optionDefault}</option>
                    {
                        form.option.map(option => {
                            return <option value={option.value} key={'option' + option.value}>{option.label}</option>
                        })
                    }
                </Form.Control>
            </Form.Group>
        } else {

            return <Form.Group className={form.className} controlId={form.controlId} key={form.key}>
                <Form.Label>{form.label}</Form.Label>
                <Form.Control type={form.type} placeholder={form.placeholder} />
            </Form.Group>
        }
    }

    render() {
        return (
            <Form>
                {this.props.form.map(form => this.setFormComponent(form))}
            </Form>
        );
    }
}

export default CustomForm;
