# 🚀 TestPilot AI

An intelligent API Testing & QA Automation platform powered by Generative AI (LLaMA 3). TestPilot AI allows QA engineers and developers to instantly parse OpenAPI/Swagger specifications, extract endpoints, and automatically generate comprehensive test suites (valid/invalid cases) using AI.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![Docker](https://img.shields.io/badge/Docker-Ready-blue)
![Azure](https://img.shields.io/badge/Azure-Deployed-blue)

---

## ✨ Features

- **OpenAPI/Swagger Parsing:** Upload any standard JSON Swagger file and automatically extract all HTTP methods and endpoint paths.
- **AI-Powered Test Generation:** Integrates with the **Groq API** (running LLaMA 3) to instantly generate realistic test scenarios, edge cases, and expected status codes for any endpoint.
- **Manual Test Management:** Manually add, edit, or describe specific test cases alongside the AI-generated ones.
- **Database Persistence:** Save API project configurations, extracted endpoints, and generated test suites directly to **MongoDB**.
- **Modern UI:** A clean, responsive dashboard built with React and Lucide Icons.
- **Enterprise-Ready Deployment:** Fully containerized with Docker, deployed on Azure App Service with automated CI/CD pipelines via GitHub Actions.

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** React (Vite)
- **Styling:** Vanilla CSS with Modern UI principles
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js (v20 Slim)
- **Framework:** Express.js (v4)
- **Database:** MongoDB (Mongoose)
- **AI Integration:** Groq API (LLaMA-3-8b-instant)
- **File Handling:** Multer (Memory Storage)

### DevOps & Infrastructure
- **Containerization:** Docker
- **Container Registry:** Azure Container Registry (ACR)
- **Hosting:** Azure App Service (Web App for Containers)
- **CI/CD:** GitHub Actions

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- Node.js (v18 or higher)
- Docker (optional)
- MongoDB URI
- Groq API Key

### 1. Clone the Repository
```bash
git clone https://github.com/Dinushka20/testpilot-ai.git
cd testpilot-ai
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Start the frontend development server:
```bash
npm run dev
```

---

## 🏗️ Architecture & Deployment

This project uses a fully automated CI/CD pipeline targeting Microsoft Azure.

1. **Continuous Integration:** Whenever code is pushed to the `main` branch, a **GitHub Actions** workflow triggers.
2. **Container Build:** The workflow builds separate Docker images for both the frontend and backend.
3. **Container Registry:** Images are pushed to the **Azure Container Registry**.
4. **Continuous Deployment:** Webhooks automatically notify the **Azure App Services** to pull the latest images and restart the containers.

### Key Deployment Configurations
- The Node.js backend container explicitly exposes and binds to port `8080` to comply with Azure's internal custom container routing.
- The `WEBSITES_PORT` application setting in the Azure portal is strictly configured to `8080`.
- The native Node.js `http` module handles server binding to ensure immediate response to Azure's startup warmup probes.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
