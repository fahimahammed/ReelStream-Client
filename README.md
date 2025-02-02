# ReelStream Frontend

## 📌 Project Overview
ReelStream is a modern frontend application designed for seamless real-time video streaming, interactive user engagement, and a smooth user experience. Built using **React 19, Vite, TailwindCSS, and TypeScript**, it leverages modern web technologies to ensure high performance and scalability.

---

## ⚡ Tech Stack & Key Dependencies

| Technology    | Purpose |
|--------------|---------|
| **React 19** | UI framework for building interactive UIs |
| **Vite** | Lightning-fast development environment |
| **TailwindCSS** | Utility-first CSS framework for styling |
| **TanStack Query** | Efficient data fetching and caching |
| **Socket.io Client** | Real-time communication |
| **Zod** | Schema validation for TypeScript |
| **React Hook Form** | Form validation and handling |
| **Radix UI** | Accessible UI components |
| **Axios** | HTTP client for API requests |

---

## 🛠️ Setup Instructions

### Prerequisites
Ensure you have the following installed on your system:
- **Node.js** (>=20.x.x)
- **Yarn** (Recommended) or npm

### Installation & Running Locally

1. **Clone the repository**
   ```sh
   git clone https://github.com/fahimahammed/ReelStream-Client.git
   cd ReelStream-Client
   ```

2. **Install dependencies**
   ```sh
   yarn install  # or npm install
   ```

3. **Start the development server**
   ```sh
   yarn dev  # Runs on http://localhost:3001
   ```

4. **Build for production**
   ```sh
   yarn build
   ```

5. **Preview production build**
   ```sh
   yarn preview
   ```

---

## 🔍 Technical Decisions

### 1️⃣ Why Vite?
- Faster build times compared to Webpack
- Native **ES module support**
- Optimized for **modern JavaScript frameworks**

### 2️⃣ React 19
- Latest version with improved performance & concurrency features
- Better **server components** support (if needed in the future)

### 3️⃣ State & Data Fetching
- **TanStack React Query**: Handles API caching and real-time updates efficiently.
- **React Hook Form**: Lightweight and optimized form management.
- **Socket.io Client**: Ensures smooth real-time data handling (e.g., live updates, notifications).

### 4️⃣ Styling & UI
- **TailwindCSS**: Utility-based styling for faster development.
- **Radix UI**: Accessible and customizable components.

### 5️⃣ TypeScript & Validation
- **Zod**: Schema-based validation to enforce data integrity.
- **TypeScript**: Ensures type safety and reduces runtime errors.

---