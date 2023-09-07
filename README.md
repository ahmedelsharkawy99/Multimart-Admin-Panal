# Multi-mart-E-Commerce Admin Panel Readme

This readme provides an overview of the E-Commerce Admin Panel built using React.js, Firebase, Remix Icons, React Router, Redux, Bootstrap, Reactstrap, Framer Motion, React Toastify, and Chart.js.

Live Demo: https://multimart-admin-panal.vercel.app/

email: admin@example.com
password: admin123456

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Introduction

The E-Commerce Admin Panel is a web-based interface developed using React.js. It allows administrators to manage various aspects of the e-commerce store such as products, orders, customers, and inventory. The admin panel integrates with Firebase for authentication, storage, and database functionalities. Remix Icons are used to enhance the visual appeal of the user interface. React Router enables smooth navigation between different pages. Redux is used for state management, ensuring a consistent user experience. Bootstrap and Reactstrap provide a responsive and stylish design. Framer Motion adds fluid animations to enhance the user interface. React Toastify displays informative notifications. Chart.js is used to visualize sales, revenue, and other key metrics.

## Features

- Secure authentication and authorization for administrators
- Product management: create, update, and delete products
- Order management: view, update, and fulfill orders
- Customer management: view and manage customer details
- Inventory management: track and update product stock levels
- Dashboard: visualize sales, revenue, and other key metrics with charts
- User-friendly interface with responsive design
- Informative notifications for important events

## Technologies Used

The E-Commerce Admin Panel utilizes the following technologies:

- React.js: A JavaScript library for building user interfaces.
- Firebase: A comprehensive platform for building web and mobile applications, providing authentication, storage, and database services.
- Remix Icons: A collection of open-source icons for web projects.
- React Router: A library for declarative routing in React applications.
- Redux: A predictable state container for JavaScript apps.
- Bootstrap: A popular CSS framework for building responsive and visually appealing websites.
- Reactstrap: A library that provides Bootstrap components as React components.
- Framer Motion: A library for creating smooth and interactive animations in React.
- React Toastify: A notification library for React applications.
- Chart.js: A JavaScript library for creating charts and visualizations.

## Getting Started

To get started with the E-Commerce Admin Panel, follow the instructions below.

### Installation

1. Clone the repository:

```
git clone <repository-url>
```

2. Change to the project directory:

```
cd e-commerce-admin-panel
```

3. Install the dependencies:

```
npm install
```

## Configuration

1. Create a Firebase project and enable Firebase Authentication, Firestore database, and Storage services.

2. Obtain the Firebase configuration object.

3. Create a `.env` file in the project root directory.

4. Add the following environment variables to the `.env` file:

   ````plaintext
   REACT_APP_API_KEY=<YOUR_FIREBASE_API_KEY>
   REACT_APP_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
   REACT_APP_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
   REACT_APP_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
   REACT_APP_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>en
   REACT_APP_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
   REACT_APP_APP_ID=<YOUR_FIREBASE_APP_ID>
   ```

   ````

5. Configure the necessary settings in the Firebase project for each service (Firebase Authentication, Firestore, and Storage).

### Usage

1. Start the development server:

```
npm start
```

2. Open the admin panel in a web browser:

```
http://localhost:3000
```

3. Log in using your administrator credentials.

4. Explore and manage the different features of the admin panel.

### Contributing

Contributions to the E-Commerce Admin Panel are welcome. To contribute, follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

```
git checkout -b feature/your-feature-name
```

3. Make the necessary changes and commit them:

```
git commit -m "Add your commit message here"
```

4. Push your changes to your forked repository:

```
git push origin feature/your-feature-name
```

5. Open a pull request in the main repository.
