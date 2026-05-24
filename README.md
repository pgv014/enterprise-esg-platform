# Enterprise ESG Emissions Management Platform

## Overview

Enterprise ESG Emissions Management Platform is a full-stack prototype designed to simulate sustainability data ingestion and review workflows used in modern ESG reporting systems.

The platform enables ingestion of emissions-related datasets from multiple enterprise-style sources, performs normalization and CO2e calculations, identifies suspicious records, and provides analyst review workflows with audit logging support.

This project was built to demonstrate backend system design, data processing workflows, REST API development, and full-stack integration using Django and React.

---

## Features

### Data Ingestion
- SAP-style CSV upload support
- Utility consumption CSV ingestion
- Mock travel emissions synchronization

### Emissions Processing
- Record normalization
- CO2e calculation workflows
- Scope-aware emissions handling
- Suspicious record detection

### Review & Audit Workflows
- Analyst approval/rejection actions
- Audit logging for review events
- Admin monitoring dashboard

### Frontend Dashboard
- Interactive React-based dashboard
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

### Database
- SQLite

---

## System Architecture

### Backend
The backend exposes REST APIs for ingestion, review workflows, and emissions record management.

Key responsibilities:
- CSV parsing and ingestion
- Emissions normalization
- CO2e calculations
- Audit logging
- Review workflow handling

### Frontend
The frontend provides a lightweight analyst dashboard for:
- Uploading source files
- Viewing emissions records
- Reviewing suspicious entries
- Performing approval/rejection actions

---

## Supported Data Sources

### SAP-style Procurement Data
Simulated fuel procurement datasets.

Example fields:
- activity
- value
- unit

### Utility Consumption Data
Electricity consumption records.

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
(Add dashboard screenshot)

### Suspicious Records
(Add suspicious records screenshot)

### Admin Panel
(Add admin panel screenshot)

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

## Disclaimer

This project is a prototype implementation intended for demonstration and educational purposes.  
External enterprise integrations such as SAP and travel APIs are simulated using mock workflows and sample datasets.

```