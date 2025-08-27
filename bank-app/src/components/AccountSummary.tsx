import React, { useEffect, useState } from 'react';
import { fetchAccountData } from '../services/firebase';

const AccountSummary: React.FC = () => {
    const [balance, setBalance] = useState<number>(0);
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const getAccountData = async () => {
            const accountData = await fetchAccountData();
            if (accountData) {
                setBalance(accountData.balance);
                setTransactions(accountData.transactions);
            }
        };

        getAccountData();
    }, []);

    return (
        <div>
            <h2>Account Summary</h2>
            <p>Balance: ${balance.toFixed(2)}</p>
            <h3>Transaction History</h3>
            <ul>
                {transactions.map((transaction, index) => (
                    <li key={index}>
                        {transaction.date}: ${transaction.amount} - {transaction.description}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AccountSummary;