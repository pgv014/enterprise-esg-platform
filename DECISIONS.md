# DECISIONS.md

# Engineering Decisions

This document outlines major implementation decisions made during development and the reasoning behind them.

---

# 1. Django + React Architecture

Choice:
- Django REST Framework for backend APIs
- React for frontend dashboard

Reasoning:
- Clear frontend/backend separation
- Easier API-based workflows
- Better simulation of real enterprise systems

---

# 2. CSV Uploads for SAP and Utility Data

Choice:
- File upload ingestion instead of direct SAP integration

Reasoning:
- Real SAP integrations are complex and require enterprise access
- CSV exports are common in real ESG workflows
- Allowed focus on normalization and ingestion logic

Subset Handled:
- flat-file export format
- fuel procurement style records

Ignored:
- IDoc parsing
- SAP authentication
- OData integrations

---

# 3. Mock Travel Sync API

Choice:
- Simulated travel platform synchronization

Reasoning:
- Real Concur/Navan APIs require authentication and enterprise accounts
- Mock sync allowed simulation of realistic ingestion workflows

Subset Handled:
- employee travel records
- airport/city travel routes
- travel distances

Ignored:
- hotel emissions
- multi-leg flights
- loyalty/travel policy systems

---

# 4. SQLite Database

Choice:
- SQLite for prototype implementation

Reasoning:
- Fast setup
- Simplified deployment
- Sufficient for assignment scope

Production Alternative:
- PostgreSQL

---

# 5. Suspicious Record Detection

Choice:
- Threshold-based suspicious flagging

Reasoning:
- Simple explainable logic
- Easy analyst review workflow simulation

Production Alternative:
- anomaly detection models
- statistical outlier detection

---

# 6. Admin-Based Review Workflow

Choice:
- Django admin for audit visibility
- Frontend actions for analyst review

Reasoning:
- Rapid implementation
- Good audit traceability
- Reduced complexity

---

# Questions I Would Ask the PM

If more time or stakeholder access were available, I would ask:

- Which SAP export formats are most common among clients?
- Are uploaded files considered authoritative or editable?
- What audit requirements must be satisfied?
- Should emissions factors be configurable?
- What reviewer permissions exist?
- Are there SLAs for ingestion pipelines?
- Should failed records be quarantined or partially ingested?

---

# Key Design Goal

The priority was not building a feature-heavy ESG product, but building a realistic prototype that demonstrates:
- ingestion workflows
- normalization logic
- auditability
- analyst review lifecycle
- deployment readiness