export interface User {
    id: string;
    email: string;
    displayName?: string;
    photoURL?: string;
}

export interface Account {
    accountId: string;
    userId: string;
    balance: number;
    transactionHistory: Transaction[];
}

export interface Transaction {
    transactionId: string;
    amount: number;
    date: Date;
    description: string;
}