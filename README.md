Github Link: https://github.com/PrasukShah/RoadQC-hackathon
## Getting Started
## ▶️ How to Run the Project

### 📥 Step 1: Clone the Repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

---

### 📦 Step 2: Install Dependencies

```bash
npm install
```

---

### ▶️ Step 3: Run Development Server

```bash
npm run dev
```

---

### 🌐 Step 4: Open in Browser

Go to:

```
http://localhost:3000
```
## ⚠️ Important Notes

* Location access must be **allowed in browser**
* Data is stored in **LocalStorage**, so:

  * It will reset if browser cache is cleared
* Video is stored as Base64 → may increase storage size

---
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# 🚧 Road Quality Checker System

## 📌 Project Overview

The **Road Quality Checker System** is a web-based application designed to streamline the process of road inspection, monitoring, and reporting. It enables engineers to upload inspection data, while inspectors and contractors can review and analyze the reports through dedicated dashboards.

The system ensures better transparency, accountability, and efficiency in infrastructure quality management.

---

## 🛠️ Tech Stack

* **Frontend:** Next.js (React), Tailwind CSS
* **State Management:** React Hooks
* **Storage:** Browser LocalStorage
* **APIs Used:** Geolocation API, OpenStreetMap Reverse Geocoding API

---

## ✅ Features Implemented (Current System)

### 🔐 Authentication System

* User **Signup & Login**
* Role-based access:

  * 👷 Engineer
  * 🏗 Contractor
  * 🏛 Inspector
* Input validation (email/phone + password rules)

---

### 👷 Engineer Module

* Upload road inspection **video**
* Automatic **location detection** using browser GPS
* Enter:

  * Material Quality (0–100)
  * Road Quality (0–100)
* Instant report submission
* Data stored in LocalStorage

---

### 🏛 Inspector Module

* Dashboard displaying all submitted reports
* Tabular view including:

  * Location
  * Road Quality
  * Material Quality
  * Video preview

---

### 🏗 Contractor Module

* View all inspection reports
* Card-based UI with:

  * Location
  * Timestamp
  * Quality metrics
  * Video playback

---

### 📊 Data Handling

* Reports stored locally in browser using **LocalStorage**
* Each report contains:

  * Unique ID
  * Location
  * Video (Base64 format)
  * Quality metrics
  * Timestamp
  * Status (Good / Poor)

---



---

### 🧪 Step 5: Test the Flow

1. **Signup**

   * Create users with different roles (Engineer, Inspector, Contractor)

2. **Login**

   * Login using created credentials

3. **Engineer Flow**

   * Upload a video
   * Enter quality metrics
   * Submit report

4. **Inspector/Contractor Flow**

   * View submitted reports
   * Verify data and video

---



## Future Scope

The current system provides a functional prototype. The following enhancements can significantly improve its real-world applicability:

### AI-Based Road Quality Detection

* Automatic crack and pothole detection using Computer Vision
* Replace manual quality input with ML model predictions

---

### Backend Integration

* Replace LocalStorage with:

  * MongoDB / Firebase / PostgreSQL
* Enable real-time, scalable data storage

---

### Secure Authentication

* Implement JWT-based authentication
* Password encryption (bcrypt)
* Role-based protected routes

---

### Advanced Location Tracking

* Store exact GPS coordinates
* Integrate Google Maps for visual inspection tracking

---

### Analytics Dashboard

* Graphs for:

  * Road quality trends
  * Area-wise analysis
* Smart alerts for poor quality reports

---

### Mobile Optimization

* Convert into mobile-first design
* Build Android/iOS app for field engineers

---

### Live Video Streaming

* Instead of upload, allow real-time inspection streaming

---

### Report Generation

* Export reports as PDF
* Automated inspection summaries

---

## Conclusion

This project demonstrates a complete workflow for road quality inspection using a modern web stack. It successfully integrates role-based access, media handling, and location tracking into a unified system.

While currently implemented as a frontend prototype using LocalStorage, it lays a strong foundation for scaling into a full-fledged smart infrastructure monitoring system.


