import React, { Component } from 'react'

export default class Test extends Component {

    state = {
        transactions: null,
    }

    getTransactions() {
        fetch('http://localhost:9000/budget/tx/raw')
            .then(response => response.json())
            .then(transactions => {
                this.setState({
                    transactions
                })
            })
            .catch(error => {
                console.log(error)
            });
    }


    componentDidMount() {
        this.getTransactions();
    }

    render() {
        const {transactions} = this.state;
        return (
            <table className="table table-hover">
                <thead className="thead-dark">
                    <tr>
                        <th>
                        </th>
                        <th>Date</th>
                        <th>Description</th>
                        <th>Debit</th>
                        <th>Credit</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    transactions ?
                        transactions.map((tx, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <input
                                            type="checkbox" />
                                    </td>
                                    <td>{tx.Date}</td>
                                    <td>{tx.Description}</td>
                                    <td>{tx.Debit}</td>
                                    <td>{tx.Credit}</td>
                                    <td>{tx.Balance}</td>
                                </tr>
                            )
                        }) :
                        <tr><td colSpan='6'>'loading...'</td></tr>
                    }
                </tbody>
            </table>
        )
    }
}
