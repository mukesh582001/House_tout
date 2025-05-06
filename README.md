# 🏠 Architecture Walkthrough

![Three.js](https://img.shields.io/badge/3D-Three.js-green)
![React](https://img.shields.io/badge/Frontend-React-blue)
![Node.js](https://img.shields.io/badge/Backend-Node.js-yellow)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![Tailwind CSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4)

An interactive 3D architecture walkthrough application where users can explore a house, 
and dynamically customize materials like pillars, roof, plywood walls, and more — all in 
real-time. Built using Three.js, React, Node.js, MongoDB, and Tailwind CSS.

---------------------------------------------------------------------------------------------------------------

## ✨ Features

- 🎨 Real-time material customization (roof, walls, shaders, etc.)
- 🧭 Interactive camera and object navigation using orbit controls
- 💾 Backend support for storing selected colors
- 💡 Intuitive dropdowns and color pickers
- 🌐 Completely web-based and responsive

---

## 🖼️ Screenshots

### 🏠 Home View – Initial House Layout
![image](https://github.com/user-attachments/assets/2d50dba6-02a5-46b1-a55a-e0d8f84ca54b)


### 🎨 Color Picker Panel
![image](https://github.com/user-attachments/assets/2df352ad-f9ce-4ce6-8ca3-eb8e45e4253c)



-------------------------------------------------------------

## 📁 Project Folder Structure
architecture_walkthrough/
│![image](https://github.com/user-attachments/assets/c64c92cc-fe74-4054-97e0-f22969aef88a)



---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/architecture-walkthrough.git
cd architecture-walkthrough
2. Install Dependencies
Backend
cd backend
npm install
Frontend
cd ../frontend
npm install
3. Configure Environment Variables
In the backend folder, create a file named .env and add your MongoDB connection string:

env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
4. Run the Application
Start Backend Server
cd backend
npm start
Start Frontend React App
cd ../frontend
npm start
The app should now be running at http://localhost:3000

🧠 Built With
Three.js – 3D visualization

React.js – Frontend framework

Node.js + Express – Backend server

MongoDB – Database

Tailwind CSS – Styling

📸 Screenshots
Add your screenshots inside a screenshots folder and link them like below:

![Home View](screenshots/home-view.png)
![Color Picker](screenshots/color-picker.png)
![Dropdown](screenshots/object-selector.png)
🪪 License
This project is open-source and available under the MIT License.



