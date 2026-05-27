# MODEL.md

# Data Model Design

The platform was designed to simulate an enterprise ESG ingestion and review workflow where emissions-related data is received from multiple external systems in inconsistent formats.

The core design goal was to normalize heterogeneous source data into a unified emissions record structure while preserving auditability and source traceability.

---

# Core Models

## Company

Represents a client organization onboarded into the platform.

Fields:
- id
- name
- created_at

Purpose:
- Enables future multi-tenant support
- Separates emissions data between organizations

---

## EmissionRecord

Primary normalized emissions entity.

Fields:
- company
- source
- activity
- normalized_value
- normalized_unit
- co2e
- scope
- suspicious
- status
- original_payload
- created_at

Purpose:
- Stores normalized emissions records
- Tracks calculated CO2e values
- Preserves raw source payloads for auditability

Design Notes:
- `original_payload` stores raw source data before normalization
- `suspicious` flags potentially invalid or abnormal records
- `status` supports analyst review workflows

---

## AuditLog

Tracks analyst actions performed on emissions records.

Fields:
- emission_record
- action
- timestamp

Purpose:
- Provides traceability for approval/rejection workflows
- Simulates audit requirements for ESG reporting

---

# Multi-Tenancy Considerations

The `Company` model was introduced to support future multi-tenant expansion where multiple enterprise clients may use the platform simultaneously.

In a production system:
- row-level isolation would be enforced
- authentication and RBAC would be added
- organization-specific permissions would be required

---

# Scope Categorization

The prototype includes support for ESG scope categorization:

- Scope 1 → fuel combustion
- Scope 2 → purchased electricity
- Scope 3 → business travel

This allows emissions records from different sources to be categorized consistently.

---

# Source-of-Truth Tracking

Each emissions record preserves:
- ingestion source
- original payload
- creation timestamp

This enables:
- traceability
- audit reconstruction
- validation workflows

---

# Unit Normalization

Different source systems expose inconsistent units.

Normalization logic converts:
- electricity usage
- fuel quantities
- travel distances

into standardized values before CO2e estimation.

---

# Suspicious Record Detection

Records are flagged as suspicious when:
- values exceed expected thresholds
- missing fields are detected
- inconsistent data is received

The goal was to simulate analyst review workflows commonly used in enterprise ESG reporting systems.

---

# Auditability

The platform was intentionally designed around audit traceability.

Key auditability mechanisms:
- immutable original payload storage
- review workflow states
- audit logs for analyst actions

This mirrors real ESG reporting requirements where auditors may request evidence of data lineage and approval history.