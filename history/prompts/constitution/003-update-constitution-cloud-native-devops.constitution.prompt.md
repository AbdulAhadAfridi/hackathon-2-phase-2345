---
id: 003
title: Update Constitution Cloud Native DevOps Phase 4
stage: constitution
date: 2026-02-09
surface: agent
model: gemini
feature: none
branch: main
user: User
command: /sp.constitution
labels: ["cloud-native", "kubernetes", "devops", "phase-4", "minikube", "helm", "aiops"]
links:
  spec: null
  ticket: null
  adr: null
  pr: null
files:
  - .specify/memory/constitution.md
tests:
---

## Prompt

@[/sp.constitution] ( Update )

Project : Cloud-Native & AI-Assisted DevOps Standards

## Core Principles

- Spec-driven development (spec → plan → tasks → implementation)
- Zero manual coding (all code and infra generated via Claude Code or AI agents)
- Deterministic and reproducible builds
- Clear separation of concerns:
  - Frontend
  - Backend
  - AI Agent
  - Infrastructure
- Security-first and isolation-by-default
- Cloud-native best practices, even in local environments

---

## Agentic Development Rules

- No feature or infrastructure change without a spec
- Every spec must have a corresponding plan
- Plans must be broken into executable steps
- All implementation must be AI-generated
- Manual edits to generated code or manifests are forbidden
- All deviations require spec or plan updates

---

## Security Standards

- JWT-based authentication across frontend, backend, and APIs
- Authorization enforced on every request
- User-level data isolation mandatory
- No secrets hardcoded
- Kubernetes secrets and environment variables only
- Containers must not run as root unless explicitly justified

---

## Application Architecture Constraints

### Core Stack
- Frontend: Next.js 16+ (App Router)
- Backend: FastAPI (Python)
- AI Agent: Reasoning + MCP Tooling
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth (JWT)

---

### Deployment Scope

- Local Kubernetes deployment only
- No paid cloud providers
- No external managed Kubernetes services

### Containerization Standards

- All services must be containerized using Docker
- Docker images must be reproducible and minimal
- Docker AI Agent (Gordon) must be used for:
  - Image optimization
  - Dockerfile generation
  - Container diagnostics (when available)

---

### Kubernetes Standards

- Kubernetes distribution: Minikube
- All workloads deployed as Kubernetes resources
- No docker run in production paths
- Resource requests and limits required for all pods
- Liveness and readiness probes required

---

### Helm & Packaging Rules

- Helm charts required for:
  - Frontend
  - Backend
- Values must be configurable
- No hardcoded environment values
- Charts must support scaling via values.yaml

---

### AI-Assisted Operations (AIOps)

- kubectl-ai must be used for:
  - Deployment
  - Scaling
  - Debugging
- kagent must be used for:
  - Cluster health analysis
  - Resource optimization insights

---

## Quality Constraints

- Application must be deployable via a single Helm install
- Cluster must reach a healthy state
- All pods must be Running or Ready
- No CrashLoopBackOff
- Logs must be readable and meaningful

---

## Success Criteria

Phase-4 is successful when:
- Application runs fully on Minikube
- Frontend and backend are containerized
- Helm charts deploy successfully
- kubectl-ai and/or kagent used for cluster operations
- No manual Kubernetes YAML edits
- Entire process traceable via specs and plans

## Response snapshot

Updated constitution from v2.0.0 to v3.0.0 (MAJOR version bump) with Cloud-Native & AI-Assisted DevOps Standards for Phase 4.

**Key Changes:**

1. **Added 4 new principles:**
   - X. Containerization Standards (NON-NEGOTIABLE)
   - XI. Kubernetes Standards (NON-NEGOTIABLE)
   - XII. Helm & Packaging Standards
   - XIII. AI-Assisted Operations (AIOps) Standards

2. **Expanded architecture to 6-layer model** - Added Infrastructure Layer (Docker, Minikube, Helm, kubectl-ai)

3. **Added Deployment Scope** - Local Kubernetes only, no paid cloud providers

4. **Added Phase 4 Success Criteria:**
   - Application runs fully on Minikube
   - Frontend and backend containerized
   - Helm charts deploy successfully
   - kubectl-ai/kagent used for cluster operations
   - No manual Kubernetes YAML edits
   - Entire process traceable via specs and plans

5. **Extended Non-Negotiable Rules:**
   - No `docker run` in production paths
   - No manual Kubernetes YAML edits
   - Containers must not run as root unless justified with ADR

## Outcome

- ✅ Impact: Constitution updated to v3.0.0 with comprehensive cloud-native DevOps standards
- 🧪 Tests: N/A (documentation update)
- 📁 Files: `.specify/memory/constitution.md`
- 🔁 Next prompts: Create specs for containerization, Helm charts, and deployment
- 🧠 Reflection: MAJOR version bump appropriate given new deployment paradigm and non-negotiable principles

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): N/A
