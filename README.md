# 🧪 Test & Task-Based Project — Bahman Sabz

This repository contains a test-oriented, task-based project developed for **Bahman Sabz**.  
The project includes **three independent tasks**, each designed, implemented, and documented separately.  
These tasks demonstrate proficiency in modern frontend technologies, clean architecture, data handling, and building optimized, responsive UI components.

---

## 🚀 Technologies & Tools Used

### **Framework & Core**
- Next.js
- TypeScript
- TailwindCSS
- MUI
- Chakra UI
- Headless UI

### **State Management & Data Handling**
- React Query
- Axios
- CryptoJS

### **Virtualization & Performance**
- React Virtuoso
- TanStack Virtual

### **APIs & Data Sources**
- DummyJSON
- RAWG API

### **UI & Icons**
- React Icons

---

## 🔗 Live Demo

The project is deployed on **Vercel** and can be accessed here:

👉 **https://bahman-sabz-task.vercel.app/**

---

## 📌 Project Structure

The project is divided into **three separate tasks**, where each task:
- Has its own dedicated directory  
- Is implemented independently  
- Uses the required technologies for that specific task  
- Can be run and tested individually  

This structure ensures clarity, modularity, and easy evaluation.

---

## 🎯 Project Goals

This project was created to demonstrate capabilities in:
- Working with modern frontend technologies  
- Building responsive and user-friendly UI  
- Managing data and API integration  
- Optimizing rendering and scroll performance  
- Designing modular and scalable architecture  

---

## 🧩 Task 1 — Authentication Dashboard with DummyJSON API

**Task 1** is built using the ready-to-use API from **DummyJSON** and UI components from **Chakra UI**.  
This task includes a fully functional **authentication system**, a **product dashboard**, and several modern frontend features such as protected routes, theme switching, pagination, and encrypted user data handling.

---

### 🔐 Authentication System

This task includes a complete login and authentication flow:

- Uses **access token** and **refresh token** for validation  
- Tokens are securely stored in **HTTP-only cookies**  
- User data is **encrypted** and stored with an expiration time  
- Protected routes prevent access for unauthenticated users  
- Includes **Light Mode / Dark Mode** theme switching  
- Login credentials for testing:  
  - **Username:** `emilys`  
  - **Password:** `emilyspass`

---

### 🛒 Product Dashboard

After login, the user is redirected to a dashboard where:

- A list of products is fetched from **DummyJSON API**  
- Each product can be opened to view detailed information  
- Product list supports **pagination**  
- The current page number is stored in the **URL**, so refreshing the page does not reset the pagination state  
- Includes a **search bar** to filter products efficiently  

---

### 🧭 Routing & Protection

- All sensitive pages are protected  
- Unauthenticated users are redirected to the login page  
- Authenticated users can access dashboard and product details  
- Theme mode (light/dark) is persistent and user-friendly  

---

### 🛠️ Technologies Used in Task 1

- **Next.js**
- **TypeScript**
- **Chakra UI**
- **DummyJSON API**
- **Axios**
- **CryptoJS**
- **React Query**

---

## 🧩 Task 2 — RAWG Games Explorer (SSR + Virtualized Rendering)

**Task 2** focuses on working with the large-scale game database provided by the  
RAWG API:  
https://api.rawg.io/docs/#tag/games

Because this API returns **a massive amount of data**, the task is designed to fetch, render, and filter game lists in a highly optimized way — without putting unnecessary load on the client or server.

---

### ⚡ High‑Performance Data Rendering

To efficiently handle thousands of game items:

- Implemented **virtualized rendering** using  
  **@tanstack/react-virtual**  
- Only visible items are rendered in the DOM  
- Ensures smooth scrolling and excellent performance  
- Perfect for large datasets without UI lag

---

### 🔍 Filtering, Search & Query Persistence

This task includes:

- Full **search functionality**  
- Multiple **filters** (genre, platform, etc.)  
- All filter states are stored in the **URL query string**  
- Refreshing the page does **not** reset filters  
- Great for shareable URLs and consistent UX

---

### 🌐 Server‑Side Rendering (SSR)

Both the **main game list page** and the **game details page** are rendered using **SSR**:

- Better SEO  
- Faster initial load  
- Improved performance on low‑end devices  
- Ensures search engines can index game content properly

---

### 🎨 UI & UX Features

- Fully **responsive** layout  
- **Dark Mode / Light Mode** support  
- **Skeleton loaders** for smooth loading states  
  - Implemented using **TailwindCSS**  
  - Plus **MUI Skeleton** component for enhanced visuals  
- **Lazy loading** for game items to reduce initial load time  
- Clean, modern, and accessible UI

---

### 🛠️ Technologies Used in Task 2

- Next.js (SSR)
- TypeScript
- TailwindCSS
- MUI (Skeleton)
- RAWG API
- @tanstack/react-virtual
- Axios
- React Query

---

## 🧩 Task 3 — Advanced Multi‑Select Component (Headless UI v2)

**Task 3** focuses on building a fully custom, flexible, and high‑performance  
**Multi‑Select Component** using **Headless UI v2**, combined with **TailwindCSS** and data virtualization techniques.

---

### 🎛️ Key Features

#### 🔍 Smart Search
- Real‑time search across large datasets  
- Optimized to avoid unnecessary re‑renders  
- Smooth and responsive even with thousands of items  

#### 📦 Large Data Handling
- Supports **very large lists** of items  
- Uses **virtualized rendering** to improve performance  
- Only visible items are rendered in the DOM  

#### 🧩 Multi‑Select Functionality
- Select **multiple items** at once  
- Select **all items** or **clear all**  
- Display selected items in a clean, user‑friendly UI  

#### 🗂️ Grouped Items
- Items can be displayed in **grouped sections**  
- Groups remain scrollable and virtualized  
- Great for categorized datasets (e.g., countries, genres, tags)

#### 🎨 Built with Headless UI v2 + TailwindCSS
- Fully accessible  
- Keyboard‑friendly  
- Styled using TailwindCSS  
- Logic handled by Headless UI v2 for maximum flexibility  

---

### 🛠️ Technologies Used in Task 3

- Headless UI v2  
- TailwindCSS  
- React  
- Virtualized rendering (for large datasets)  

---

## 🛠️ How to Run

```bash
npm install
npm run dev
