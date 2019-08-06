import React, { Component } from 'react';
import './import.scss';

export default class Import extends Component {
    state = {
        transactions: null,
        rowSelected: []
    }

    /**
     * getTransactions
     * get transaction list from json file
     */
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

    /**
     * rowSelectHandle
     * Add new rows if row is selected remove if not
     */
    rowSelectHandle = e => {
        const isChecked = e.target.checked;
        const id = Number(e.target.id);

        this.setState({
            rowSelected: isChecked ?
                [...this.state.rowSelected, id] :
                this.state.rowSelected.filter(r => (r !== id))
        });
    }

    exportTransactions(transactions) {
        fetch('http://localhost:9000/budget/tx/exportToMysql',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(transactions)
        })
        .then(response => response.json())
        .then(res => {
            console.log('affected rows', res);
        })
        .catch(error => {
            console.log(error)
        });
    }

    /**
     * Get all the selected transactions and export to MySQL
     */
    importSelectedTransactionsHandle = e => {
        const transactions = this.state.transactions.filter((tx, index) => {
            return (this.state.rowSelected.length && this.state.rowSelected.includes(index))
        });

        if (transactions.length) {
            this.exportTransactions(transactions);
        } else {
            alert('Must select al least 1 transaction');
        }
    }

    render() {
        const {transactions} = this.state;
        return (
            <div className="container" id="app-import">
                <button type="button" className="btn btn-primary" onClick={this.importSelectedTransactionsHandle} >Import selected trasactions</button>
                <table className="table table-borderless table-hover mt-3 position-relative">
                    <thead className="border-bottom">
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th className="text-right">Debit</th>
                            <th className="text-right">Credit</th>
                            <th className="text-right">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        transactions ?
                            transactions.map((tx, index) => {
                                return (
                                    <tr key={index}>
                                        <td>
                                        <div className="custom-control custom-checkbox">
                                            <input type="checkbox" className="custom-control-input" id={index} onChange={this.rowSelectHandle} />
                                            <label className="custom-control-label pl-3" htmlFor={index}>{tx.Date}</label>
                                        </div>
                                        </td>
                                        <td>{tx.Description}</td>
                                        <td className="text-number text-right">{`${tx.Debit ? '-$' + tx.Debit.toFixed(2) : ''}`}</td>
                                        <td className="text-number text-right">{`${tx.Credit ? '+$' + tx.Credit.toFixed(2) : ''}`}</td>
                                        <td className="text-number text-right">{`$${tx.Balance}`}</td>
                                    </tr>
                                )
                            }) :
                            <tr><td colSpan='6'>'loading...'</td></tr>
                        }
                    </tbody>
                </table>

            </div>
        )
    }
}
