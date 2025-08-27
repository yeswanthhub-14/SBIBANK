# Bank App

## Overview
This is a simple banking application built using React and Firebase. The app allows users to log in, view their account summary, and manage their transactions.

## Features
- User authentication using Firebase
- Account summary display
- Transaction history
- Responsive design

## Project Structure
```
bank-app
├── src
│   ├── components
│   │   └── AccountSummary.tsx
│   ├── services
│   │   └── firebase.ts
│   ├── pages
│   │   ├── Home.tsx
│   │   └── Login.tsx
│   └── types
│       └── index.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd bank-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000`.

## Firebase Setup
To use Firebase, you need to set up a Firebase project and add your configuration to the `firebase.ts` file in the `src/services` directory.

## Contributing
Feel free to submit issues or pull requests for any improvements or features you'd like to see!

## License
This project is licensed under the MIT License.