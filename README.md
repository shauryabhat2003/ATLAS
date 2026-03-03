<div align="center">

# ⚡ ATLAS — AI Chat Assistant

A premium, full-stack AI-powered chat assistant built with React and Node.js. ATLAS leverages Google's Gemini 2.5 Flash model to deliver intelligent, real-time conversational AI with streaming responses, image understanding, and code assistance — all wrapped in a sleek, dark-themed glassmorphism interface.

**[🚀 Live Demo](https://atlas-qvwy.onrender.com)**

</div>

---

## ✨ Features

### 💬 Intelligent Conversations
ATLAS uses Google's Gemini 2.5 Flash model to provide fast, context-aware responses. Conversations are streamed in real-time, character by character, giving a natural and responsive chat experience. Full chat history is maintained so you can return to any previous conversation.

### 🖼️ Image Analysis
Upload any image directly into the chat and ATLAS will analyze it using multimodal AI capabilities. Get detailed descriptions, extract text, identify objects, or ask specific questions about the image content.

### 💻 Code Assistance
Get help writing, debugging, refactoring, and explaining code across multiple programming languages. ATLAS renders code blocks with proper syntax highlighting and can walk through logic step by step.

### 🔐 Secure Authentication
User authentication is handled by Firebase Auth, supporting both **Email/Password** sign-up and **Google OAuth** sign-in. All user data and chat history is securely tied to authenticated accounts and stored in MongoDB Atlas.

### 📱 Responsive & Premium UI
The interface features a modern dark theme with glassmorphism effects, smooth micro-animations, gradient accents, and a particle background on the landing page. The layout is fully responsive and works seamlessly across desktop and mobile devices.

### 💾 Persistent Chat History
Every conversation is automatically saved to MongoDB. The sidebar displays all past chats, allowing users to navigate between sessions effortlessly. Chat data is scoped per user for privacy.

---

## 🛠️ Tech Stack

| Layer          | Technology                          | Purpose                                    |
|----------------|-------------------------------------|--------------------------------------------|
| **Frontend**   | React 18, Vite, TailwindCSS         | Fast SPA with utility-first styling        |
| **Backend**    | Node.js, Express                    | RESTful API server                         |
| **Database**   | MongoDB Atlas (Mongoose)            | Cloud-hosted NoSQL data storage            |
| **Auth**       | Firebase Authentication             | Email/Password & Google OAuth              |
| **AI Engine**  | Google Gemini 2.5 Flash             | Multimodal AI with streaming responses     |
| **Images**     | ImageKit                            | Image upload, storage & transformation     |

---

## 📁 Project Structure

```
ATLAS/
├── client/                      # React frontend (Vite)
│   ├── src/
│   │   ├── components/          # ChatList, NewPrompt, Upload, ParticleBackground
│   │   ├── context/             # AuthContext (Firebase auth state management)
│   │   ├── layouts/             # RootLayout (AuthProvider) & DashboardLayout
│   │   ├── lib/                 # Firebase config, Gemini AI config
│   │   └── routes/              # Homepage, Dashboard, ChatPage, SignIn, SignUp
│   ├── .env                     # Frontend environment variables
│   └── package.json
├── bhai-backend/                # Express API server
│   ├── models/                  # Mongoose schemas (Chat, UserChats)
│   ├── firebase-admin-config.js # Firebase Admin SDK initialization
│   ├── index.js                 # API routes, CORS, auth middleware
│   ├── .env                     # Backend environment variables
│   └── package.json
└── render.yaml                  # Render Blueprint deployment config
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18 or higher
- **MongoDB Atlas** account ([mongodb.com/atlas](https://www.mongodb.com/atlas))
- **Firebase** project ([console.firebase.google.com](https://console.firebase.google.com/))
- **Google Gemini API** key ([aistudio.google.com](https://aistudio.google.com/))
- **ImageKit** account ([imagekit.io](https://imagekit.io/))

### 1. Clone the repository

```bash
git clone https://github.com/shauryabhat2003/ATLAS.git
cd ATLAS
```

### 2. Set up Firebase

1. Create a new project in the [Firebase Console](https://console.firebase.google.com/)
2. Navigate to **Build → Authentication** and enable **Email/Password** and **Google** sign-in methods
3. Register a **Web App** under Project Settings and note the config values (`apiKey`, `authDomain`, `projectId`)
4. Go to **Project Settings → Service Accounts** and click **"Generate new private key"** to download the service account JSON

### 3. Configure environment variables

Create or update the `.env` files with your credentials:

**Backend** (`bhai-backend/.env`):
```env
MONGO=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
IMAGE_KIT_PRIVATE_KEY=your_imagekit_private_key
FIREBASE_SERVICE_ACCOUNT={"type":"service_account","project_id":"...","private_key":"...","client_email":"..."}
```
> **Note:** The `FIREBASE_SERVICE_ACCOUNT` value must be the entire service account JSON on a **single line**.

**Frontend** (`client/.env`):
```env
VITE_API_URL=http://localhost:3000
VITE_GEMINI_PUBLIC_KEY=your_gemini_api_key
VITE_IMAGE_KIT_ENDPOINT=your_imagekit_endpoint
VITE_IMAGE_KIT_PUBLIC_KEY=your_imagekit_public_key
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 4. Install dependencies & run

```bash
# Install and start the backend
cd bhai-backend
npm install
node index.js

# In a new terminal — install and start the frontend
cd client
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser, create an account, and start chatting! 🎉

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/shauryabhat2003">Shaurya Bhatnagar</a>
</div>
