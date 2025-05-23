# Smart Campus Management System
## Installation
**Frontend**
* **Frontend Server:** React.js + SCSS/SASS (with Vite.js for development)

**How to Use**

Step 1. Install **Node Modules**
* Installing node modules for frontend:
```
npm install
```

Step 2. Install **React Router Dom**
* Using **Router** for navigating between pages:
```
npm install react-router-dom
```

Step 3. Install **React Toastify**
* Using **Toastify** for notifying messages:
```
npm install react-toastify
```

Step 4. Install **React Big Calender**
* Using **Big Calender** for showing schedule:
```
npm install react-big-calendar
```

Step 5. Install **Date FNS with locale support**
* Using date tranfering to Vietnames time:
```
npm install date-fns
```

Step 6. Install **Axios**
* Using axios for faster using **API** from backend:
```
npm install axios
```

Step 7. Install **Material UI**
* Using **MUI**:
```
npm install @mui/material @emotion/react @emotion/styled
```
* Using **MUI Icon**:
```
npm install @mui/icons-material
```
* Using **MUI Date Picker**:
```
npm install @mui/x-date-pickers
```

Step 8. Run Server
* To run server with localhost address: `http://localhost:5173/` we will use:
```
npm run dev
```

**Backend**

**Project Structure**
* **Backend Server:** Node.js (`node index.js`)
* **Database:** MongoDB Atlas (cloud-hosted)

**How to Use**

1. Connect to MongoDB (via Compass)
You can connect to the MongoDB database using MongoDB Compass or any MongoDB client with the following **connection string**:

```
mongodb+srv://scams123456:scams123456@cluster0.seanfrh.mongodb.net/smart_campus
```

> Tip: Open MongoDB Compass → Click “New Connection” → Paste the string above → **Connect**

2. Run the Backend Server
* Step 1: Switch to the backend branch
git checkout backend

* Step 2: Navigate to the server folder
cd server

* Step 3: Install dependencies
npm install

* Step 4: Start the server
node index.js

**Connect with backup database**

* Step 1: Open MySQL Workbench.

* Step 2: Connect to AzureDB.

* Step 3: Go to File > Open SQL Script, and select your .sql file.

* Step 4: Review the file contents. It should include CREATE DATABASE, USE, CREATE TABLE, and INSERT statements.

* Step 5: Click lightning bolt icon (⚡) to execute the script.

