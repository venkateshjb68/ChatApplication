# Django-Real-Time-Chat-App & P2P File Transfer 
Here’s a **clean, properly formatted `README.md`** you can directly copy and use in your project. I’ve organized the sections, fixed formatting issues, and made it GitHub-ready.

---

````markdown
# 🐍 Django P2P Chat & File Transfer App

A real-time chat application built with **Django Channels** and **WebSockets**.  
It features a WhatsApp-like UI, live messaging, an Admin Dashboard, and **serverless Peer-to-Peer (P2P) file transfer** using **WebRTC**.

---

## 🚀 Features

### 💬 Real-Time Messaging
- Instant message delivery using WebSockets (Django Channels)
- No page reloads required
- Responsive, WhatsApp Web–inspired UI (Mobile & Desktop)

### 📂 Serverless P2P File Transfer
- Send files **directly** from User A to User B
- No file storage on the server
- Uses **WebRTC DataChannels**
- Supports all file types (Images, PDFs, ZIPs, etc.)
- **Privacy-focused:** Files exist only in browser memory during transfer

### 🛡️ Admin Dashboard
- **URL:** `/ad1/`
- View all currently active users
- **Kick User:** Instantly disconnect a user and reload their page
- **Clear Chat:** Remove chat history for all connected users

### 👤 User System
- Simple name-based login (no password, demo-friendly)
- Live “Present Members” list
- Dynamic header showing the current user’s name

---

## 🛠️ Installation Guide

### Prerequisites
- Python **3.8+**
- `pip` (Python package manager)

---

### Step 1: Project Setup
Run the setup script:
pip install -r requirement.txt
````

---

### Step 2: Install Dependencies

Navigate into the project directory and install required packages:

```bash
cd django_chat_app
pip install django channels daphne
```

---

### Step 3: Run Migrations

Initialize the SQLite database:

```bash
python manage.py migrate
```

---

### Step 4: Start the Server

Run the Django development server:

```bash
python manage.py runserver
```

---

## 📖 Usage Guide

### 1️⃣ Joining the Chat

1. Open your browser and go to:

   ```
   http://127.0.0.1:8000/
   ```
2. Enter a name (e.g., **Alice**) and click **Join Chat**
3. Open another tab or Incognito window
4. Enter a different name (e.g., **Bob**)

---

### 2️⃣ Sending Messages

* Type a message and press **Enter** or click **Send**
* Messages appear instantly for all users

---

### 3️⃣ Sending Files (P2P)

1. Click the **📎 Paperclip** icon
2. Select a file from your computer
3. A message appears:

   ```
   Alice shared a file: photo.jpg
   ```
4. **Sender must stay on the page**
5. Receiver clicks **⬇ Download (P2P)**

✅ File is transferred **directly browser-to-browser** with correct name and format

---

### 4️⃣ Admin Dashboard

Navigate to:

```
http://127.0.0.1:8000/ad1/
```

**Available Actions:**

* **BLOCK / KICK:** Disconnect a user instantly
* **CLEAR ALL CHAT HISTORY:** Remove messages from everyone’s screen

---

## ⚙️ Technical Specifications

| Component          | Technology Used                           |
| ------------------ | ----------------------------------------- |
| Backend Framework  | Django 4.x / 5.x                          |
| Real-Time Protocol | WebSockets (ASGI)                         |
| WebSocket Handler  | Django Channels & Daphne                  |
| P2P Transfer       | WebRTC (RTCPeerConnection + DataChannels) |
| Frontend           | HTML5, CSS3, Vanilla JavaScript           |
| Database           | SQLite (Default)                          |
| Channel Layer      | InMemoryChannelLayer (Dev) / Redis (Prod) |

---

## 📁 Directory Structure

```
django_chat_app/
├── manage.py            # Django Task Runner
├── myproject/           # Project Settings & ASGI Config
│   ├── settings.py
│   ├── urls.py
│   └── asgi.py
└── chat/                # Chat Application
    ├── consumers.py     # WebSocket & WebRTC Logic
    ├── views.py         # HTTP Views (Admin Dashboard)
    ├── routing.py       # WebSocket URL Routing
    └── templates/
        └── chat/
            ├── index.html   # Main Chat Interface
            └── admin.html   # Admin Dashboard
```

---

## ⚠️ Limitations (Development Mode)

* **P2P Transfer:**
  Uses `InMemoryChannelLayer`, which works well on `localhost`.
  For internet-based usage, configure a **TURN server** (e.g., Coturn, Twilio) in the WebRTC `rtcConfig`.

* **Storage:**
  Chat history is **not persisted**. Messages exist only during the browser session.

---

## ✅ Future Improvements

* User authentication with Django Auth
* Message persistence using a database
* Redis channel layer for production
* TURN/STUN configuration for global P2P support

---

## 📜 License

This project is for educational and demo purposes.

---

**Happy Chatting! 🚀**

```

---

If you want, I can also:
- Add **screenshots section**
- Create a **Docker-based README**
- Simplify it for **GitHub beginners**
- Convert it to a **production-ready README**

Just tell me 👍
```
