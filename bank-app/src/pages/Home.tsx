import React from 'react';
import AccountSummary from '../components/AccountSummary';

const Home: React.FC = () => {
    return (
        <div>
            <h1>Welcome to Your Bank</h1>
            <AccountSummary />
            <nav>
                <ul>
                    <li><a href="/transactions">View Transactions</a></li>
                    <li><a href="/settings">Account Settings</a></li>
                </ul>
            </nav>
        </div>
    );
};

export default Home;