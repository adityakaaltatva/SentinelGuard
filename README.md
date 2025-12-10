SentinelGuard

SentinelGuard is a cloud-security detection and posture-monitoring system focused on practical, high-signal rules rather than academic noise. It inspects IAM configurations, storage permissions, container build files, supply-chain metadata, and IaC drift to expose vulnerabilities that actually get exploited in real environments. The system is built as a modular engine with a detection pipeline, enrichment layer, rule-runtime, and a clean deployment story through Helm charts.

Why SentinelGuard Exists

Modern cloud setups break not because of zero-days but because teams misconfigure IAM, leave buckets open, leak secrets in CI/CD, or drift from Terraform. SentinelGuard covers exactly these “real world” cracks with a set of deterministic, explainable detection rules. It aligns with how security has operated for decades—detect what is dangerous, explain clearly why, and produce an audit trail.

Core Architecture

SentinelGuard follows a straightforward yet scalable design:

1. Ingestion Layer

The engine consumes resource manifests, Terraform state outputs, S3/Bucket policies, IAM definitions, Dockerfiles, and dependency manifests. These can come from:

Periodic crawlers

Webhooks from CI/CD

Direct API submissions

Events are normalized into a consistent internal format before entering the pipeline.

2. Enrichment Layer

Raw cloud artifacts often lack context. SentinelGuard enriches incoming data with:

Account metadata

Identity relationships

Transitive dependency graphs

Normalized policy structures

This gives the rule engine the context it needs to produce accurate findings.

3. Detection Runtime

This is where SentinelGuard actually earns its name. Every rule is a stateless module executed against the enriched payload. A rule inspects a normalized asset and emits a structured Finding.

Current production rules include:

IAM policies with wildcard privileges

Public S3 buckets

Azure Blob containers with public access

Dockerfiles exposing secrets

Transitive dependency vulnerabilities

Terraform drift between declared and actual state

4. Findings Pipeline

Findings are deduplicated, ranked, assigned severity, and persisted. The system maintains a simple lifecycle: New → Active → Resolved.

5. Deployment

A Helm chart is included to deploy a complete MVP to Kubernetes. This ensures:

Configurable ingestion workers

Stateless detection service

PostgreSQL storage

Optional message broker

Horizontal scalability

Key Features

Deterministic rule evaluation with predictable output

Strong focus on cloud misconfigurations that matter in real breaches

Modular rule architecture for easy extension

Simple, explained findings that engineers can act on immediately

Cloud-agnostic ingestion

Kubernetes-native deployment via Helm

Tech Stack

Backend: Node.js / TypeScript

Database: PostgreSQL

Queue (Optional): Redis / NATS

Infra: Docker, Kubernetes, Helm

Rule Engine: Custom plug-in architecture in TS

The stack keeps complexity down while allowing horizontal scaling when load gro
