# SOURCES.md

# Source Research and Assumptions

This document outlines the real-world source formats researched during development and how those influenced the prototype design.

---

# 1. SAP Fuel and Procurement Data

Research:
- SAP exports commonly appear as flat CSV exports, IDocs, OData responses, or procurement extracts
- Enterprise exports often contain inconsistent naming conventions and units

Prototype Choice:
- CSV upload ingestion

Reasoning:
- Realistic for sustainability teams exporting procurement data manually
- Simpler prototype implementation while preserving ingestion realism

Sample Data Characteristics:
- fuel activity names
- procurement-style quantities
- inconsistent units

Production Risks:
- inconsistent schemas
- multilingual headers
- plant code mappings
- incomplete metadata

---

# 2. Utility Electricity Data

Research:
- Facilities teams commonly export electricity data through utility portals
- Billing periods frequently do not align with calendar months
- Units and tariff formats vary significantly

Prototype Choice:
- CSV portal-style export ingestion

Reasoning:
- Common operational workflow
- Easier to normalize consistently

Sample Data Characteristics:
- meter IDs
- electricity usage values
- kWh units

Production Risks:
- billing corrections
- tariff complexity
- partial meter failures
- timezone inconsistencies

---

# 3. Corporate Travel Data

Research:
- Platforms such as Concur and Navan expose travel records through APIs
- Flight emissions often require airport distance calculations
- Travel categories affect emissions estimation logic

Prototype Choice:
- simulated API synchronization

Reasoning:
- avoids dependency on enterprise credentials
- demonstrates ingestion workflow behavior

Sample Data Characteristics:
- employee travel
- city-to-city routes
- approximate travel distances

Production Risks:
- incomplete distance data
- multi-leg travel complexity
- hotel emissions
- duplicated travel records

---

# Realism Goals

The objective was not to perfectly replicate enterprise integrations, but to:
- simulate realistic ingestion challenges
- preserve source traceability
- demonstrate normalization workflows
- support analyst review and auditability

The sample datasets were intentionally designed to resemble operational ESG reporting inputs rather than simplified toy examples.