
# FindX - Lost & Found Management System

## Overview
FindX is a Lost & Found Management System designed for GNIMS college to help students, faculty, and staff recover lost items. The system enables users to register lost items, search for found items, and claim them easily. 

## Features
- **User Registration & Login**: Users can create an account and log in to access their dashboard.
- **Item Listing**: Users can report lost and found items by filling in item details.
- **Search & Filter**: Advanced search options to find lost items by category, location, or description.
- **Claim Items**: Users can claim an item by verifying their identity.
- **Admin Dashboard**: Admins can manage users and items, approve claims, and more.

## Technologies Used
- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Tokens)
- **API**: RESTful APIs

## Project Setup

### Prerequisites
Ensure that you have the following installed:
- Node.js
- MongoDB

### Backend Setup
1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/FindX.git
    cd FindX
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file for environment variables:
    ```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/findx
    JWT_SECRET=your_jwt_secret
    ```
4. Run the server:
    ```bash
    npm start
    ```

### Frontend Setup
1. Navigate to the `client` folder:
    ```bash
    cd client
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Run the development server:
    ```bash
    npm start
    ```

## Folder Structure
```
├── Frontend/                  # Frontend React app
├── Backend/                  # Backend Express server
├── .env                     # Environment variables
├── README.md                # Project documentation
└── package.json             # Project dependencies and scripts
```

## Contributing
We welcome contributions to the FindX project. To get started, fork the repository and make your changes in a separate branch. After testing your changes, submit a pull request for review.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
