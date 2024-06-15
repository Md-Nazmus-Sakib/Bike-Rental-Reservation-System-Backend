# Bike Rental Reservation System Backend

Welcome to the Bike Rental Reservation System Backend! This project provides the backend infrastructure for a bike rental service, allowing users to sign up, log in, rent bikes, and manage their profiles. The system also includes admin functionalities for managing bikes and monitoring rentals.

## Live URL

Live URL is https://bike-rental-reservation-system-backend-livid.vercel.app/

## Overview Video URL

Project Overview Video link: https://drive.google.com/file/d/1Xa1UGU_BWsfY_-_1IXxS_P8Xn80hJmsF/view?usp=sharing

## Features

- User Authentication: Sign up, log in, and profile management.
- Admin Features: Create, update, and delete bike entries.
- Bike Rentals: Rent and return bikes, calculate rental costs.
- Authorization: Ensure users and admins can only access their permitted routes.
- Comprehensive Error Handling: Includes validation errors, not found routes, and general error responses.
- Data Validation: Uses Zod for input validation ensuring data consistency.

## Technology Stack

- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **ODM & Validation Library:** Mongoose for MongoDB, Zod
- **Package Management:** npm
- **Authentication:** JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

- **Node.js**
- **MongoDB**
- **npm**

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Md-Nazmus-Sakib/Bike-Rental-Reservation-System-Backend
   cd Bike-Rental-Reservation-System-Backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```env
   NODE_ENV=development
   PORT=5000
   DATABASE_URL=your_mongodb_connection_string
   BCRYPT_SALT_ROUNDS=12
   JWT_ACCESS_TOKEN=your_jwt_secret
   JWT_REFRESH_EXPIRES_IN=10d

   ```

   Replace `your_mongodb_connection_string` with your actual MongoDB connection string and `your_jwt_secret` with a secure secret key for JWT.

### Running the Application

1. **Start the server:**

   ```bash
   npm run start:dev
   ```

   The server should be running on `http://localhost:5000`.

## Admin Info

```bash
Admin Email: admin@example.com
Password: password123
```

## API Endpoints

## **User Routes**:

1. **Sign Up**
   - **Route**: /api/auth/signup (POST)
   - **Request Body**:
     ```json
     {
       "name": "John Doe",
       "email": "john@example.com",
       "password": "password123",
       "phone": "1234567890",
       "address": "123 Main St, Anytown"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 201,
       "message": "User registered successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1f5",
         "name": "John Doe",
         "email": "john@example.com",
         "phone": "1234567890",
         "address": "123 Main St, Anytown",
         "createdAt": "2024-06-10T13:26:51.289Z",
         "updatedAt": "2024-06-10T13:26:51.289Z",
         "__v": 0
       }
     }
     ```
2. **User Login**
   - **Route**: /api/auth/login (POST)
   - **Request Body**:
     ```json
     {
       "email": "john@example.com",
       "password": "password123"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "User logged in successfully",
       "token": "jwt_token",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c3",
         "name": "John Doe",
         "email": "john@example.com",
         "phone": "1234567890",
         "address": "123 Main St, Anytown"
       }
     }
     ```
3. **Get Profile**
   - **Route**: /api/users/me (GET)
   - **Request Headers**: Authorization: Bearer jwt_token
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "User profile retrieved successfully",
       "data": {
         "_id": "6666ff917181b8e5ffe04f91",
         "name": "admin",
         "email": "admin@gmail.com",
         "phone": "1234567890",
         "address": "123 Main St, Anytown",
         "role": "admin",
         "createdAt": "2024-06-10T13:28:49.260Z",
         "updatedAt": "2024-06-10T13:28:49.260Z",
         "__v": 0
       }
     }
     ```
4. **Update Profile**
   - **Route**: /api/users/me (PUT)
   - **Request Headers**: Authorization: Bearer jwt_token
   - **Request Body**:
     ```json
     {
       "name": "John Updated",
       "phone": "0987654321"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Profile updated successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c5",
         "name": "John Updated",
         "email": "john@example.com",
         "phone": "0987654321",
         "address": "123 Main St, Anytown"
       }
     }
     ```

## **Bike Routes**:

1. **Create Bike (Admin Only)**
   - **Route**: /api/bikes (POST)
   - **Request Headers**: Authorization: Bearer jwt_token
   - **Request Body**:
     ```json
     {
       "name": "Mountain Bike",
       "description": "A durable mountain bike for rough terrains.",
       "pricePerHour": 15,
       "cc": 250,
       "year": 2022,
       "model": "X1",
       "brand": "Yamaha"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Bike added successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c4",
         "name": "Mountain Bike",
         "description": "A durable mountain bike for rough terrains.",
         "pricePerHour": 15,
         "isAvailable": true,
         "cc": 250,
         "year": 2022,
         "model": "X1",
         "brand": "Yamaha"
       }
     }
     ```
2. **Get All Bikes**

   - **Route**: /api/bikes (GET)
   - **Response**:

     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Bikes retrieved successfully",
       "data": [
         {
           "_id": "bike_id",
           "name": "Mountain Bike",
           "description": "A durable mountain bike for rough terrains.",
           "pricePerHour": 15,
           "isAvailable": true,
           "cc": 250,
           "year": 2022,
           "model": "X1",
           "brand": "Yamaha"
         },
         ...other bikes...
       ]
     }

     ```

3. **Update Bike (Admin Only)**
   - **Route**: /api/bikes/:id (PUT)
   - **Request Headers**: Authorization: Bearer jwt_token
   - **Request Body**:
     ```json
     {
       "pricePerHour": 20
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Bike updated successfully",
       "data": {
         "_id": "bike_id",
         "name": "Mountain Bike",
         "description": "A durable mountain bike for rough terrains.",
         "pricePerHour": 20, // Updated price per hour
         "isAvailable": true,
         "cc": 250,
         "year": 2022,
         "model": "X1",
         "brand": "Yamaha"
       }
     }
     ```
4. **Delete Bike (Admin Only)**
   - **Route**: /api/bikes/:id (DELETE)
   - **Request Headers**: Authorization: Bearer jwt_token
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Bike deleted successfully",
       "data": {
         "_id": "bike_id",
         "name": "Mountain Bike",
         "description": "A durable mountain bike for rough terrains.",
         "pricePerHour": 20,
         "isAvailable": false,
         "cc": 250,
         "year": 2022,
         "model": "X1",
         "brand": "Yamaha"
       }
     }
     ```

## **Rental Routes**:

1. **Create Rental**

   - **Route**: /api/rentals (POST)
   - **Request Headers**: Authorization: Bearer jwt_token
   - User information should be extracted from the token
   - **Bike's availability status should be updated to false**
   - **Request Body**:
     ```json
     {
       "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
       "startTime": "2024-06-10T09:00:00Z"
     }
     ```
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Rental created successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c4",
         "userId": "60d9c4e4f3b4b544b8b8d1c3",
         "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
         "startTime": "2024-06-10T09:00:00Z",
         "returnTime": null,
         "totalCost": 0,
         "isReturned": false
       }
     }
     ```

   **Important Note:** Upon creating a rental, ensure the bike's isAvailable status is set to false to indicate that it is currently rented out and not available for other users to rent.

1. **Return Bike (Admin Only)**
   - **Route**: /api/rentals/:id/return (PUT)
   - **Request Headers**: Authorization: Bearer jwt_token
   - **Request Body**: Not needed
   - **Bike's availability status should be updated to true**
   - **Hints**: The cost should be calculated based on the start and return time of the rental. For example, if the start time is "2024-06-10T09:00:00Z" and the return time is "2024-06-10T18:00:00Z" (current time), the total rental duration is 9 hours. If the price per hour is $15, the total cost will be 9 \* 15 = $135.
   - **Response**:
     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Bike returned successfully",
       "data": {
         "_id": "60d9c4e4f3b4b544b8b8d1c4",
         "userId": "60d9c4e4f3b4b544b8b8d1c3",
         "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
         "startTime": "2024-06-10T09:00:00Z",
         "returnTime": "2024-06-10T18:00:00Z", // Current time when returning the bike
         "totalCost": 135, // Calculated based on rental duration
         "isReturned": true
       }
     }
     ```
1. **Get All Rentals for User (My rentals)**

   - **Route**: /api/rentals (GET)
   - **Request Headers**: Authorization: Bearer jwt_token
   - **Response**:

     ```json
     {
       "success": true,
       "statusCode": 200,
       "message": "Rentals retrieved successfully",
       "data": [
         {
           "_id": "60d9c4e4f3b4b544b8b8d1c4",
           "userId": "60d9c4e4f3b4b544b8b8d1c3",
           "bikeId": "60d9c4e4f3b4b544b8b8d1c4",
           "startTime": "2024-06-10T09:00:00Z",
           "returnTime": "2024-06-10T18:00:00Z",
           "totalCost": 135,
           "isReturned": true
         },
         ...other rentals...
       ]
     }

     ```
