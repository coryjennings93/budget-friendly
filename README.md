# 📉 Budget Friendly

Budget Friendly is a full-stack JavaScript learning project aimed at helping individuals manage their finances effectively. It provides tools to visualize spending habits, track expenses, and stay within budget for various categories.

## 📁 Project Structure

The project is structured into two separate folders:

- **Client Side**: Contains the frontend code for the application.
- **Server Side**: Contains the backend code for the application.

## About the Project

### 🎯 Objectives

- Assist users in managing their finances by visualizing spending patterns.
- Encourage users to identify areas where they can cut back on spending to allocate more funds to savings or other categories.
- Enable users to create budgets, add expenses and income, and track spending against budget limits.
- Provide features for filtering expenses by category and viewing total spending for each category.

### 🚀 Features

- Users can create budgets and add expenses and income to them.
- Expenses can be filtered by category to see how much of the total spending is attributed to each category.
- Users can filter expenses by month or year.
- Custom spending categories can be created and edited.

### 🎉 Demo Mode

- A demo mode is available to allow users to interact with the application without creating an account.
- Sample data is provided and stored locally in the browser's storage.

### 🛠️ Technical Information

- Developed using Node.js version 21.2.0.
- Frontend technologies include React, React Router, Tailwind CSS, and Shadcn.
- Backend technologies include Express.js for server-side development and PostgreSQL for database management.
- The backend for this project is still in development mode, and this project will assist me in learing backend web development.

## 🚀 Getting Started

To explore where I currently am in the development process, you can intereat with the frontend of the project and demo its features:

1. Clone the `client` folder.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the development server (built with Vite).

## :world_map: Database Schema

![Database Schema](/extras/budgetFriendlyDatabaseSchema.png)

- You can use this schema to replicate the Postgresql database.
- None of the fields should allow for NULL values.
- The isChecked value in the category table should be a boolean and initially set to false.

##

Feel free to contribute to the project or provide feedback to enhance its functionality and usability.

PS: This is an updated version of an older project I had started a couple years back.
