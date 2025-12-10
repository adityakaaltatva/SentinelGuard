# SentinelGuard

SentinelGuard is a cloud-security detection and posture-monitoring system focused on practical, high-signal rules rather than academic noise. It inspects IAM configurations, storage permissions, container build files, supply-chain metadata, and IaC drift to expose vulnerabilities that actually get exploited in real environments. The system is built as a modular engine with a detection pipeline, enrichment layer, rule-runtime, and a clean deployment story through Helm charts.

---

## Why SentinelGuard Exists

Modern cloud setups break not because of zero-days but because teams misconfigure IAM, leave buckets open, leak secrets in CI/CD, or drift from Terraform. SentinelGuard covers exactly these real-world cracks with deterministic, explainable detection rules. It follows the traditional security philosophy — detect what is dangerous, explain clearly why, and generate an auditable trail.

---

## Core Architecture

SentinelGuard follows a straightforward yet scalable design.

---

### **1. Ingestion Layer**

The engine consumes multiple types of cloud artifacts:

- Resource manifests  
- Terraform state outputs  
- S3/Bucket policies  
- IAM definitions  
- Dockerfiles  
- Dependency manifests  

These inputs may come from periodic crawlers, CI/CD webhooks, or direct API submissions.  
All events are normalized into a consistent internal structure before processing.

---

### **2. Enrichment Layer**

Raw cloud artifacts lack context. SentinelGuard enriches them with:

- Account metadata  
- Identity relationship mapping  
- Transitive dependency graphs  
- Normalized IAM and policy structures  

This enrichment stage provides the detection rules with deeper visibility.

---

### **3. Detection Runtime**

Every rule is a stateless module executed against enriched payloads.  
Each rule inspects the asset and emits a structured `Finding`.

**Production-ready rules include:**

- IAM policies with wildcard privileges  
- Public S3 buckets  
- Azure Blob containers with public access  
- Dockerfiles exposing secrets  
- Transitive dependency vulnerabilities  
- Terraform drift between declared and actual state  

---

### **4. Findings Pipeline**

Findings flow through a lightweight lifecycle:

`New → Active → Resolved`

They are deduplicated, ranked, assigned severity, and stored for further analysis.

---

### **5. Deployment**

A Helm chart ships with the project to deploy the full MVP to Kubernetes:

- Configurable ingestion workers  
- Stateless detection service  
- PostgreSQL backend  
- Optional Redis/NATS message broker  
- Horizontal scalability across components  

---

## Key Features

- Deterministic and explainable detection  
- Focus on misconfigurations that actually cause breaches  
- Modular plug-in rule architecture  
- Cloud-agnostic ingestion design  
- Kubernetes-native deployment  
- Clean, structured findings output  

---

## Tech Stack

- **Backend:** Node.js / TypeScript  
- **Database:** PostgreSQL  
- **Queue (Optional):** Redis or NATS  
- **Infrastructure:** Docker, Kubernetes, Helm  
- **Rule Engine:** Custom TypeScript plug-in framework  

The technology choice keeps the system lean while supporting horizontal scale when needed.

---
