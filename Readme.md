# NayePankh Foundation — AI-Enabled Social Impact Platform

An advanced, full-stack web application developed for **NayePankh Foundation** to bridge the gap between grassroots activism and modern technology. The platform features an interactive landing page, an AI-powered multilingual chatbot (Panah-AI) integrating Google Gemini 2.5 Flash, and an administrative dashboard to manage volunteer applications.

---

## 🌟 Key Features

- **Empathetic Landing Page:** Fully responsive frontend styled with TailwindCSS v4 featuring premium micro-animations, bento grids, and interactive widgets.
- **Panah-AI Assistant:** Live AI assistant powered by **Gemini 2.5 Flash** with rule-based fallbacks, supporting common inquiries about donations, contact options, programs, and volunteering.
- **Changemaker Recruitment:** A streamlined onboarding form that captures and stores volunteer inquiries.
- **Admin Command Center:** A secure, session-authenticated administration dashboard to review applicant registrations, filter by interests, inspect analytics, and manage volunteers.
- **Performance Optimized:** Key-matching fallback system to instantly respond to repeated prompts without hitting API rate limits or consuming tokens.

---

## 🏗️ Architecture & Project Structure

The project is structured as a decoupled client-server architecture:

```text
├── backend/                  # Flask Server & Database
│   ├── templates/            # Jinja2 Templates (Admin Dashboard & Login)
│   │   ├── Dashboard.html    # Main stats and volunteer management table
│   │   └── login.html        # Secure admin login form
│   ├── app.py                # Flask main entrypoint (APIs, auth, DB & Gemini client)
│   ├── database.db           # SQLite database
│   ├── requirements.txt      # Python dependencies
│   ├── .env.sample           # Sample environment configurations
│   └── .gitignore
│
└── frontend/                 # React + Vite Client
    ├── src/
    │   ├── components/
    │   │   ├── common/       # Chatbot, VolunteerForm, charts & cards
    │   │   ├── layouts/      # Header, Footer
    │   │   └── sections/     # Hero, Mission, Impact, AITools, Join
    │   ├── pages/            # Home.jsx
    │   └── App.jsx
    ├── package.json          # Node dependencies & build scripts
    └── vite.config.js        # Vite configurations
```

---

## 💻 Tech Stack

### **Frontend**
- **Core Library:** React 19
- **Build Tool:** Vite
- **Styling:** TailwindCSS v4
- **Navigation:** React Router Dom v7
- **Iconography:** Remix Icons

### **Backend**
- **Framework:** Flask
- **AI Integration:** Google GenAI SDK (`google-genai` library / Gemini 2.5 Flash)
- **Database:** SQLite3
- **Authentication:** Flask Session-based Auth

---

## 🔌 API Endpoints

### **Public Endpoints**
* **`GET /`**
  - **Description:** Health check and system status overview.
* **`POST /become-volunteer`**
  - **Description:** Register a new volunteer.
  - **Payload:**
    ```json
    {
      "full_name": "John Doe",
      "email": "john.doe@example.com",
      "area_of_interest": "Digital Literacy"
    }
    ```
* **`POST /ai-bot`**
  - **Description:** Message portal to talk with Panah-AI (Gemini-powered chatbot).
  - **Payload:** `{"content": "How can I volunteer?"}`

### **Administrative Endpoints**
* **`GET /login` & `POST /login`**
  - **Description:** Session login for administrative access.
* **`GET /logout`**
  - **Description:** Clear admin session and redirect.
* **`GET /admin`**
  - **Description:** Render HTML dashboard displaying total volunteers, registration graphs, and candidate applications.
* **`DELETE /api/volunteers/<id>`**
  - **Description:** Delete volunteer candidate record (requires admin authentication).

---

## ⚙️ Development & Local Setup

### **Prerequisites**
- **Node.js** (v18.x or higher)
- **Python** (v3.10.x or higher)
- **Gemini API Key** (Obtain from Google AI Studio)

---

### **1. Setup the Backend**

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a virtual environment and activate it:
   ```bash
   python -m venv .venv
   source .venv/bin/activate   # On Windows: .venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.sample` to `.env`:
     ```bash
     cp .env.sample .env
     ```
   - Open `.env` and fill in your Gemini API Key and admin credentials:
     ```env
     PORT=8000
     ADMIN_USERS=admin:admin
     GEMINI_API_KEY=your-gemini-api-key-here
     ```

5. Run the Flask server:
   ```bash
   python app.py
   ```
   The backend service will boot on `http://127.0.0.1:8000`.

---

### **2. Setup the Frontend**

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install the node packages:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   The client application will start running on `http://localhost:5173`.

---

## 🗄️ Database Schema

The SQLite database (`database.db`) automatically initializes the `volunteers` table with the following schema on startup:

| Field Name | Type | Key | Default / Extra |
| :--- | :--- | :--- | :--- |
| `id` | INTEGER | PRIMARY KEY | AUTOINCREMENT |
| `full_name` | TEXT | - | NOT NULL |
| `email` | TEXT | - | NOT NULL |
| `area_of_interest` | TEXT | - | NOT NULL |
| `created_at` | TIMESTAMP | - | CURRENT_TIMESTAMP |

---

## 🤝 Contributing

1. Fork the Project.
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4. Push to the Branch (`git push origin feature/AmazingFeature`).
5. Open a Pull Request.
