import './App.css';
import { Link} from 'react-router-dom';
import {Component} from "react";
import {Field} from 'formik';
import {Button, Form, FormGroup} from 'react-bootstrap';

class Account extends Component {

    constructor(props) {
        super(props);
        this.state = {
            createAccountRequest : {
                customerID: '',
                initialCredit: 0
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        console.log(this.props.match.params.id)
        this.setState({
            createAccountRequest : {
                customerID: this.props.match.params.id,
                initialCredit: 0
            }})
    }

    async handleSubmit(event) {
        event.preventDefault();
        const {createAccountRequest} = this.state;

        await fetch('/api/v1/account', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(createAccountRequest),
        });
        this.props.history.push('/');
    }



    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let createAccountRequest = {...this.state.createAccountRequest};
        createAccountRequest[name] = value;
        this.setState({createAccountRequest});
    }

    render() {
        const { createAccountRequest } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-intro">
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Form.Label for="customerId">Customer Id</Form.Label>
                                <Form.Control type="text" name="customerId" id="customerId" disable="true" value={this.state.createAccountRequest.customerID} />
                            </FormGroup>
                            <FormGroup>
                                <Form.Label for="initialCredit">Initial Credit</Form.Label>
                                <Form.Control type="text" name="initialCredit" id="initialCredit" value={this.state.createAccountRequest.initialCredit}
                                    onChange={this.handleChange} autoComplete="initialCredit" />
                            </FormGroup>
                            <FormGroup>
                                <Button color="primary" type="submit">Save</Button>{' '}
                                <Button color="secondary" tag={Link} to="/">Cancel</Button>
                            </FormGroup>
                        </Form>
                    </div>
                </header>
            </div>
        )

    }

}

export default Account;