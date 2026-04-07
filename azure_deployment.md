# Azure Deployment Plan for CarOner Backend and Web Platform

## 1. Objective
This document lists the Azure resources required to deploy CarOner phase 1:
- foundational infrastructure
- backend services
- web application
- observability and security baseline

This plan is designed for an infra-first rollout, followed by backend and web deployment. Android and iOS will reuse this backend later.

## 2. Deployment Principles
- use separate environments: dev, staging, production
- automate infrastructure provisioning
- store secrets outside code
- prefer managed Azure services
- keep MVP operationally simple but production-safe

## 3. Core Azure Resources

### 3.1 Resource groups
Recommended:
- `rg-caroner-dev`
- `rg-caroner-staging`
- `rg-caroner-prod`

Optional split for larger environments:
- application resource group
- data resource group
- networking resource group

### 3.2 Networking
Required resources:
- Virtual Network (VNet)
- Subnets for app, data/private endpoints, and optional build agents
- Network Security Groups (if using subnet-level controls)
- Private Endpoints for database, storage, and key vault in staging/prod
- Private DNS Zones if private endpoints are enabled

Recommendation:
For MVP dev, public access can be allowed selectively. For staging and prod, use private access where practical.

### 3.3 Compute hosting options
Choose one of the following primary deployment models.

#### Option A, recommended for modern deployment
Azure Container Apps
Use for:
- backend API
- Next.js web app
- background worker if needed later

Benefits:
- container-native
- easier scale control
- revisions and rollback support
- simpler than full AKS

#### Option B, simpler if the team wants less container management
Azure App Service
Use for:
- backend API web app
- frontend web app

Benefits:
- fast setup
- strong CI/CD integration
- simple operational model

Recommendation:
- if the team already uses Docker, choose Container Apps
- otherwise choose App Service for faster delivery

## 4. Data and State Services

### 4.1 Azure Database for PostgreSQL Flexible Server
Required for:
- users
- vehicles
- vendors
- bookings
- reviews
- support tickets
- audit logs metadata

Configuration guidance:
- single server per environment
- automated backups enabled
- zone redundancy for production if budget allows
- read replicas not required for MVP

### 4.2 Azure Cache for Redis
Required for:
- OTP/session throttling
- caching catalog/search data
- temporary booking locks
- background queue support if implemented

### 4.3 Azure Storage Account
Services used:
- Blob Storage for images and uploaded assets
- optional Queue Storage if lightweight async jobs are used

Use cases:
- vendor and service images
- downloadable reports or exports later
- static uploads

## 5. Security and Secrets

### 5.1 Azure Key Vault
Store:
- database connection strings
- JWT secrets
- SMS provider keys
- email provider keys
- Google Maps API keys
- storage access secrets
- social auth client secrets

### 5.2 Managed Identity
Enable managed identity for deployed applications so they can securely access:
- Key Vault
- Storage
- other Azure resources

### 5.3 Microsoft Entra ID
Use for:
- Azure resource access control
- optional internal admin authentication later

## 6. Observability and Operations

### 6.1 Application Insights
Use for:
- request tracing
- dependency tracking
- failure monitoring
- performance monitoring

### 6.2 Log Analytics Workspace
Use for:
- centralized logs
- metrics queries
- alert rules
- dashboarding

### 6.3 Azure Monitor Alerts
Create alerts for:
- API downtime
- high error rates
- CPU or memory pressure
- database storage thresholds
- failed deployments
- key vault access anomalies if needed

## 7. Edge, DNS, and TLS

### 7.1 Front Door or Application Gateway
Recommended options:
- Azure Front Door for global routing, TLS, CDN-like edge behavior, and WAF
- Azure Application Gateway if regional routing and WAF are sufficient

Recommendation:
For public webapp and API, Azure Front Door is the better long-term choice.

### 7.2 Custom domains
Expected domains:
- `app.caroner.com` for customer web app
- `vendor.caroner.com` for vendor portal
- `admin.caroner.com` for admin portal
- `api.caroner.com` for backend API

### 7.3 Certificates
Use:
- managed TLS certificates where supported
- or Azure Key Vault integrated certificates if needed

## 8. CI/CD and Infrastructure as Code

### 8.1 Source control and pipeline
Recommended:
- GitHub repository
- GitHub Actions for CI/CD

Pipelines should cover:
- lint and test
- build frontend and backend
- build containers if applicable
- provision infrastructure
- deploy application
- run database migrations

### 8.2 Infrastructure as Code
Recommended tools:
- Bicep if the team wants native Azure IaC
- Terraform if multi-cloud or standardization matters

Recommendation:
Use Bicep for this project if Azure is the committed platform.

## 9. Recommended Environment Layout

### Dev
Purpose:
- active development
- lower-cost sizing
- public access acceptable with restrictions

Resources:
- 1 app hosting environment
- 1 PostgreSQL flexible server
- 1 Redis cache basic/small tier
- 1 storage account
- 1 key vault
- 1 application insights instance
- 1 log analytics workspace

### Staging
Purpose:
- pre-production validation
- UAT and regression testing

Resources:
- mirror production as closely as budget allows
- use same deployment topology as production

### Production
Purpose:
- live customer and vendor traffic

Resources:
- highly available app deployment
- production PostgreSQL with backups and HA where possible
- Redis standard tier
- private endpoints preferred
- Front Door and WAF recommended
- stronger monitoring and alerting

## 10. Application Deployment Units

### Web application
Contains:
- customer web UI
- vendor portal
- admin portal

Deployment choices:
- one unified Next.js app with route/role partitioning
- or separate deployables if operational isolation is preferred

Recommendation:
Start with one deployable web application to reduce MVP complexity.

### Backend API
Contains:
- auth
- user management
- vehicles
- services catalog
- vendor management
- bookings
- reviews
- support
- notifications orchestration

### Background worker, optional in phase 1
Use if needed for:
- reminders
- email/SMS sending queues
- cleanup jobs
- booking status jobs

## 11. External Integrations to Plan For
Store configuration for:
- Google Maps Platform
- SMS provider such as Twilio, MessageBird, or local regional provider
- email provider such as SendGrid or Azure Communication Services Email
- future push notification service for mobile apps
- future insurance and pollution-check partner APIs

## 12. Minimal Azure Resource Checklist
This is the practical minimum set for phase 1.

### Mandatory
- Azure Resource Group
- Azure App Service Plan and Web Apps, or Azure Container Apps environment and apps
- Azure Database for PostgreSQL Flexible Server
- Azure Cache for Redis
- Azure Storage Account
- Azure Key Vault
- Application Insights
- Log Analytics Workspace
- Azure Monitor alerts
- DNS and TLS setup

### Strongly recommended
- Azure Front Door with WAF
- Virtual Network
- Private Endpoints for data services
- Managed Identity
- Backup validation process

## 13. Suggested Naming Pattern
Example only, adapt to org standards.

- `aca-caroner-api-dev`
- `aca-caroner-web-dev`
- `psql-caroner-dev`
- `redis-caroner-dev`
- `stcaronerdev`
- `kv-caroner-dev`
- `appi-caroner-dev`
- `log-caroner-dev`

Repeat per environment.

## 14. Cost and Sizing Guidance for MVP
At MVP stage, choose modest sizes.

Starting point:
- small to medium app instances
- burstable or small general-purpose PostgreSQL
- basic/standard Redis depending on expected OTP and caching load
- standard storage account
- basic Front Door/WAF depending on traffic expectations

Scale triggers:
- sustained API latency increase
- rising booking traffic
- larger image upload volume
- more vendors and service inventory

## 15. Deployment Sequence
Recommended order:
1. create Azure subscription structure and resource groups
2. create networking and access model
3. provision Key Vault, storage, PostgreSQL, Redis, monitoring
4. provision app hosting layer
5. configure DNS, certificates, and edge routing
6. deploy backend API
7. run database migrations and seed master service categories
8. deploy web application
9. enable alerts, dashboards, and backup checks
10. run staging validation, then production release

## 16. Deliverables for Infra Phase
Infra phase should produce:
- IaC templates
- environment variable and secrets matrix
- network diagram
- application deployment pipeline
- backup and restore checklist
- runbook for deployment and rollback

## 17. Recommendation Summary
For CarOner phase 1, the recommended Azure stack is:
- Azure Container Apps or App Service for web and API
- Azure Database for PostgreSQL Flexible Server
- Azure Cache for Redis
- Azure Blob Storage
- Azure Key Vault
- Application Insights + Log Analytics
- Azure Front Door + WAF
- Bicep-based infrastructure provisioning

This gives a solid backend foundation for the web launch now and mobile apps later.
