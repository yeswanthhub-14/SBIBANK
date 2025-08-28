import React, { useState } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDki77xVj3Ocya6qVT_zs1SCGdwlLFfLyc",
  authDomain: "streamline-finance-ed1il.firebaseapp.com",
  databaseURL: "https://streamline-finance-ed1il-default-rtdb.firebaseio.com",
  projectId: "streamline-finance-ed1il",
  storageBucket: "streamline-finance-ed1il.firebasestorage.app",
  messagingSenderId: "614139276978",
  appId: "1:614139276978:web:c96e38818afadb4a02e3ab"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

function CustomerPanel() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [balance, setBalance] = useState(null);
  const [transferTo, setTransferTo] = useState("");
  const [transferAmount, setTransferAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  // Login with Firebase
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await userCred.user.getIdToken();
      setToken(idToken);
      // Send token to backend
      const res = await fetch("http://localhost:5000/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: idToken })
      });
      if (res.ok) setLoggedIn(true);
      else alert("Login failed");
    } catch (err) {
      alert("Firebase login error: " + err.message);
    }
  }

  // Balance check
  async function checkBalance() {
    const res = await fetch("http://localhost:5000/customer/balance", {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const data = await res.json();
    setBalance(data.balance || "Error: " + data.error);
  }

  // Transfer money
  async function transferMoney() {
    const res = await fetch("http://localhost:5000/customer/transfer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        to_customer_id: transferTo,
        amount: parseFloat(transferAmount)
      })
    });
    const data = await res.json();
    alert(data.message || data.error);
    checkBalance();
  }

  // Withdraw money
  async function withdrawMoney() {
    const res = await fetch("http://localhost:5000/customer/withdraw", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ amount: parseFloat(withdrawAmount) })
    });
    const data = await res.json();
    alert(data.message || data.error);
    checkBalance();
  }

  // Get transaction history
  async function getTransactions() {
    const res = await fetch("http://localhost:5000/customer/transactions", {
      headers: { "Content-Type": "application/json" },
      credentials: "include"
    });
    const data = await res.json();
    setTransactions(data.transactions || []);
  }

  if (!loggedIn) {
    return (
      <form onSubmit={handleLogin}>
        <h2>Customer Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    );
  }

  return (
    <div>
      <h2>Customer Panel</h2>
      <button onClick={checkBalance}>Check Balance</button>
      <div>Balance: {balance !== null ? balance : "-"}</div>

      <h3>Transfer Money</h3>
      <input
        type="text"
        placeholder="Recipient Customer ID"
        value={transferTo}
        onChange={e => setTransferTo(e.target.value)}
      />
      <input
        type="number"
        placeholder="Amount"
        value={transferAmount}
        onChange={e => setTransferAmount(e.target.value)}
      />
      <button onClick={transferMoney}>Transfer</button>

      <h3>Withdraw Money</h3>
      <input
        type="number"
        placeholder="Amount"
        value={withdrawAmount}
        onChange={e => setWithdrawAmount(e.target.value)}
      />
      <button onClick={withdrawMoney}>Withdraw</button>

      <h3>Transaction History</h3>
      <button onClick={getTransactions}>Load Transactions</button>
      <ul>
        {transactions.map(tx => (
          <li key={tx.id}>
            {tx.timestamp}: {tx.type} - {tx.amount} ({tx.details})
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CustomerPanel;