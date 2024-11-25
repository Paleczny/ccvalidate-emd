# Credit Card Validation Backend
This is a backend service for validating credit card numbers using the Luhn algorithm. 
The service is built using Node.js and Express and provides an API endpoint for checking whether a credit card number is valid. 
This backend is designed to work with a frontend component that sends credit card numbers to be validated.

## Requirements
Node.js >= 14.x
npm

## Installation
To run just the backend

### Install Dependencies:
npm install

### Start the Development Server:
`npm run dev`

## Available Scripts
In the project directory, you can run:

- `npm run dev`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

 - `npm run test` The page will reload if you make edits.\
You will also see any lint errors in the console.

## Project Structure
```sh
backend
|-- src
|   |-- index.ts
|   |-- routes
|   |   |-- validationRoute.ts
|   |-- services
|   |   |-- __test__
|   |   |   |-- validationService.spec.ts
|   |   |-- validationService.ts
|-- jest.config.js
|-- package.json
|-- package-lock.json
|-- tsconfig.json
```