# Enterprise ESG Emissions Management Platform

## Overview

Enterprise ESG Emissions Management Platform is a full-stack ESG data management prototype designed to simulate enterprise sustainability reporting workflows.

The platform enables ingestion of emissions-related datasets from multiple enterprise-style sources, performs normalization and CO2e calculations, identifies suspicious records, and supports analyst review workflows with audit logging capabilities.

The project demonstrates:
- Full-stack application development
- REST API design using Django REST Framework
- Data ingestion and processing workflows
- Frontend-backend integration
- Deployment of production-ready web applications

---

## Live Deployment

### Frontend
https://enterprise-esg-platform.vercel.app

### Backend
https://enterprise-esg-platform-production.up.railway.app

### Admin Panel
https://enterprise-esg-platform-production.up.railway.app/admin

---

## Features

### Data Ingestion
- SAP-style CSV upload support
- Utility emissions data ingestion
- Mock travel emissions synchronization
- Multi-source emissions handling

### Emissions Processing
- Record normalization
- CO2e calculation workflows
- Scope-aware emissions processing
- Suspicious record detection

### Review & Audit Workflows
- Analyst approval/rejection actions
- Audit logging for review events
- Admin monitoring dashboard

### Frontend Dashboard
- React-based interactive dashboard
- Upload management interface
- Emissions records table
- Suspicious record highlighting

---

## Tech Stack

### Backend
- Django
- Django REST Framework

### Frontend
- React
- Axios
- Vite

### Database
- SQLite

### Deployment
- Railway (Backend)
- Vercel (Frontend)

---

## System Architecture

### Backend
The backend exposes REST APIs for ingestion, emissions processing, and analyst review workflows.

Core responsibilities:
- CSV parsing and ingestion
- Emissions normalization
- CO2e calculations
- Audit logging
- Review workflow handling

### Frontend
The frontend provides an analyst-facing dashboard for:
- Uploading source files
- Viewing emissions records
- Reviewing suspicious entries
- Performing approval/rejection actions

---

## Supported Data Sources

### SAP-style Procurement Data
Simulated procurement and fuel consumption datasets.

Example fields:
- activity
- value
- unit

### Utility Consumption Data
Electricity usage records.

Example fields:
- meter_id
- kwh

### Travel Emissions Data
Mock business travel emissions synchronization.

Example fields:
- employee
- from
- to
- distance

---

## Setup Instructions

### Backend Setup

```bash
python3 -m venv venv

source venv/bin/activate

pip install -r requirements.txt

python3 manage.py migrate

python3 manage.py runserver
```

Backend runs at:

```text
http://127.0.0.1:8000
```

---

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs at:

```text
http://localhost:5173
```

---

## Core Functionalities

- Multi-source emissions ingestion
- CO2e estimation workflows
- Suspicious data identification
- Analyst review lifecycle
- Audit traceability
- Admin-level monitoring
- Full-stack deployment workflow

---

## Project Structure

```text
breathe-esg/
│
├── backend/
├── core/
├── frontend/
├── screenshots/
├── requirements.txt
├── README.md
└── manage.py
```

---

## Screenshots

### Dashboard
![Dashboard](screenshots/dashboard1.png)

### Emissions Records
![Records](screenshots/dashboard2.png)

### Admin Panel
![Admin](screenshots/admin_panel.png)

---

## Future Improvements

- PostgreSQL integration
- Async ingestion pipelines
- OCR-based invoice extraction
- Advanced anomaly detection
- Analytics dashboards
- Authentication & RBAC
- Cloud deployment optimizations

---

## Login details for admin page

Username-admin1
email-admin1@gmail.com
password-12345

---

