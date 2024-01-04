# WebQRtalog Backend

## Overview

Welcome to the WebQRtalog backend! This project serves as the server-side implementation for managing inventory items and their possession chains.

## Technologies Used

- **Node.js:** Backend runtime environment
- **Express:** Web application framework for Node.js
- **MongoDB:** Database for storing inventory items and possession chains
- **Mongoose:** ODM library for MongoDB
- **bcryptjs:** Library for hashing passwords
- **jsonwebtoken:** Library for generating and verifying JSON Web Tokens
- **@sendgrid/mail:** Library for sending emails using SendGrid
- **crypto:** Library for cryptographic functions

## Models

### Inventory Item Model

- Fields:
  - `productName`
  - `category`
  - `quantity`
  - `serialNumber`
  - `currentAssignee`
  - `qrCode`
  - `barcode`

### Possession Model

- Fields:
  - `assetId` (Reference to Inventory Item)
  - `possessionHistory` (Array of possession change details)

### User Model

- Fields:
  - `username`
  - `badgeName`
  - `password`
  - `email`
  - `resetToken`
  - `resetTokenExpiry`

## Routes

### User Routes

- **POST /signup:**

  - Creates a new user with hashed password.
  - Handles duplicate username, badgeName, and email errors.

- **POST /login:**

  - Logs in a user and sets a secure HTTP-only token cookie.

- **PUT /forgotpassword:**

  - Generates a random string for password reset.
  - Sends a password reset email using SendGrid.

- **PUT /forgotpassword/:id:**

  - Verifies the reset token and updates the password.

- **PUT /emailupdate/:id:**

  - Updates user email after password verification.

- **POST /logout:**
  - Clears the user token cookie.

### Possession Routes

- **GET /:**

  - Retrieves all possession chains.

- **GET /:inventoryId:**

  - Retrieves a single possession chain by inventory item ID.

- **PUT /:inventoryId:**
  - Adds a change of possession for the specified inventory item.

## Inventory Routes

### Add New Inventory Item & Possession Chain

- **POST /:**
  - Creates a new inventory item and its associated possession chain.
  - Needed: `productName`, `category`, `quantity`, `serialNumber`

### Update Inventory Item

- **PUT /:id:**
  - Updates the details of an existing inventory item.
  - Params: `InventoryItem._id`
  - Needed: `productName`, `category`, `quantity`, `serialNumber`, `currentAssignee`, `qrCode`, `barcode`

### View All Inventory Items

- **GET /:**
  - Retrieves all inventory items.

### View Single Inventory Item

- **GET /:id:**
  - Retrieves details of a single inventory item by ID.

## Getting Started

1. Clone the repository.
2. Install dependencies using `pnpm install`.
3. Set up MongoDB connection in the `config/database.js` file.
4. Set environment variables in a `.env` file (See example below).
   ```plaintext
   SECRET='your_secret_key'
   MONGODB_URL='Mongo Database Url'
   SENDGRID_API_KEY='your_sendgrid_api_key'
   ```
5. Run the server with `pnpm start`.

## Backend Site

[WebQRtalog Backend Site]()
