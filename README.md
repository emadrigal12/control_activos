# DCC Raw Material Inventory Management System

## Description

Desarrollo de Contabilidades y Consultorías (DCC) is a Costa Rican company offering comprehensive solutions for efficient inventory management, with a focus on raw materials. With an experienced and highly qualified team, DCC helps businesses of all sizes optimize their inventory processes, reduce costs, and maximize profits. Their accounting services include:

- Physical inventory of fixed assets: Conducting physical inventories using efficient and reliable techniques to ensure data accuracy.
- Fixed asset tagging: Identifying and correctly recording fixed assets to comply with accounting and tax standards.
- Accounting outsourcing: Handling bookkeeping, preparing financial statements, and meeting tax obligations, allowing clients to focus on their core business.

Creating a web-based raw material inventory system for DCC can effectively enhance efficiency, accuracy, visibility, collaboration, customer service, and cost management.

## Features

In addition to the mentioned benefits, a raw material inventory web application can provide several other advantages, including:

- Customizable report generation
- Low inventory alerts
- Barcode scanning for inventory entry and exit
- Integration with other enterprise software systems

## Business Focus

Our business revolves around providing accounting and financial services to companies of various sizes and sectors. Our primary goal is to ensure accuracy and transparency in financial management, focusing on effective management of assets (raw materials). Specific services we offer include:

- Asset registration and management
- Inventory and valuation of fixed and current assets
- Implementation of asset control systems
- Accounting consultancy:
  - Financial structuring advice
  - Training on accounting standards

## Project Scope

This project aims to develop a raw material inventory system to optimize inventory management and control. The primary features of the application include:

- Authentication and security:
  - User login with username and password
  - Role management and permissions
- User Interface:
  - Intuitive menu
  - Easy navigation through functionalities
- Inventory management:
  - Registration, editing, and deletion of raw materials
  - Real-time monitoring of inventory levels
- Transactions:
  - Recording raw material inputs and outputs
  - Reversal of incorrect transactions
- Queries:
  - Custom queries and reports
  - Exporting reports to PDF
- Help section:
  - Explanatory text and images

## Technologies Used

### Frontend

- React
- ChakraUI
- JavaScript

### Backend

- Node.js
- MySQL

## Cloud Hosting

- **AWS**: The SQL Server database is hosted on Amazon Web Services (AWS).

# Workflow

1. **User Interaction:**
   - The user logs into the inventory page via an interface built with React and ChakraUI.
   - They navigate through the page to view the list of raw materials, search for specific materials, or access forms to add or update information.

2. **Request Generation:**
   - When the user performs an action, such as adding a new material or updating a quantity, the React frontend generates an API request.
   - This request is managed by JavaScript, which uses `fetch` or a library like `axios` to send the information to the server.

3. **Backend Handling:**
   - The frontend request is received by the Node.js backend.
   - Node.js processes the request, performs necessary validations, and determines the operation to be executed (e.g., insert a new record, update an existing record, or delete one).

4. **Database Interaction:**
   - Node.js communicates with the MySQL database to perform the requested operation.
   - It executes SQL queries to add, update, or delete records in the database based on the data sent from the frontend.

5. **Database Update:**
   - The MySQL database updates its records according to the request.
   - AWS ensures that the database remains available and secure throughout this process.

6. **Response to Frontend:**
   - Once the operation is complete, Node.js sends a response back to the frontend.
   - This response may include updated data, confirmation of the operation, or error messages.

7. **User Interface Update:**
   - React receives the response from the backend and updates the user interface based on the new data.
   - The page refreshes to reflect the changes made in the database, such as adding a new material or updating quantities.

8. **Error Handling:**
   - If an error occurs at any point in the process (e.g., a failed request or a database issue), the frontend displays an appropriate error message to inform the user.
## Preview

![Imagen de WhatsApp 2024-07-18 a las 07 10 49_b05a82f9](https://github.com/user-attachments/assets/1e7b7860-42ae-4734-9152-95b67868681e)

![Imagen de WhatsApp 2024-07-18 a las 07 11 05_f9afc6c2](https://github.com/user-attachments/assets/be419817-c0ff-41c9-94f6-c681c777cde5)

![Imagen de WhatsApp 2024-07-18 a las 07 11 17_6e3d500a](https://github.com/user-attachments/assets/d90d3770-e823-4535-86cf-298fe118ba29)

![Imagen de WhatsApp 2024-07-18 a las 07 11 24_a9e6b6df](https://github.com/user-attachments/assets/1a7e8363-cd4e-41e4-b679-974ee4857a03)

![Imagen de WhatsApp 2024-07-18 a las 07 11 30_f0636f12](https://github.com/user-attachments/assets/8bcc3ad7-0de3-46dc-a3b3-d84c7a8359fd)

![Imagen de WhatsApp 2024-07-18 a las 07 11 42_242fdaf0](https://github.com/user-attachments/assets/84831d75-cb8c-4bb1-b3bc-5925d7358648)

![Imagen de WhatsApp 2024-07-18 a las 07 13 13_30728535](https://github.com/user-attachments/assets/aa2cde12-740f-4903-b329-f4d8d2ab960d)


