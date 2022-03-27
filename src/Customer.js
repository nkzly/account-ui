import './App.css';
import {Component} from "react";
import {Link} from 'react-router-dom';
import {Button} from 'react-bootstrap';

class Customer extends Component {
    state = {
        customers: [{
            accounts: [{
                    transactions: []
                }]
        }]
    };

    async componentDidMount() {
        const response = await fetch('/api/v1/customer');
        const body = await response.json();
        this.setState({customers: body});
    }


    render() {
        const {customers} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <div className="App-intro">
                        <h2>Customer</h2>
                        {customers.map(customer =>
                        <div key={customer.customerNumber}>
                           <b>{customer.name} {customer.surname}</b>

                            {
                                customer.accounts.map(account =>
                                    (<p> Accounts: {account.accountId},Balance: {account.balance} , Creation Time: {account.creationDate}
                                        {
                                            account.transactions.map(transaction =>
                                                (<p> Transactions
                                                    : {transaction.transactionId} ,Transfer Amount: {transaction.amount}, Transfer Time: {transaction.transferTime}</p>)
                                            )}
                                    </p>)
                                )
                            }
                            <Button color="link"><Link to={`/account/${customer.customerNumber}`}>Create Account</Link></Button>
                        </div>
                        )}
                    </div>
                </header>
            </div>
        );
    }

}

export default Customer;
