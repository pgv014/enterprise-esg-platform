# TRADEOFFS.md

# Deliberate Tradeoffs

This prototype intentionally prioritizes realistic ingestion and review workflows over production-scale infrastructure.

Several features were intentionally not implemented.

---

# 1. No OCR or PDF Parsing

Not Built:
- utility bill OCR ingestion
- PDF extraction pipelines

Reason:
- OCR accuracy and document parsing require substantial additional infrastructure
- CSV ingestion was prioritized to demonstrate normalization workflows within assignment scope

Production Approach:
- OCR pipelines
- document classification
- extraction validation workflows

---

# 2. No Authentication or RBAC

Not Built:
- user authentication
- role-based permissions
- organization isolation

Reason:
- assignment focus appeared centered on ingestion and analyst workflows
- reduced implementation complexity for prototype timeline

Production Approach:
- JWT authentication
- organization-based RBAC
- SSO integrations

---

# 3. No Async Processing Pipelines

Not Built:
- Celery workers
- background ingestion queues
- retry mechanisms

Reason:
- synchronous ingestion simplified deployment and debugging
- sufficient for prototype-scale workloads

Production Approach:
- async ingestion queues
- retry handling
- ingestion monitoring

---

# Additional Limitations

- static emissions factors
- simplified suspicious detection logic
- SQLite instead of PostgreSQL
- limited validation rules
- simplified travel emissions estimation

---

# Tradeoff Philosophy

The project intentionally focused on:
- correctness
- explainability
- auditability
- deployment completeness

rather than attempting to build a feature-complete ESG platform within the assignment timeframe.