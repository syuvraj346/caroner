# CarOner Technical Design Document

## 1. Purpose
This document translates the MVP requirements into a technical design for the first delivery phase of CarOner:
- backend platform
- admin and vendor web application
- customer-facing web application
- shared architecture that will later support Android and iOS apps

This phase intentionally prioritizes deployable infrastructure and a production-ready web stack before native mobile delivery.

## 2. Product Scope
CarOner is a car ownership services platform that aggregates Emergency, Maintenance, Convenience, and Enhancement services into a unified experience.

### MVP business targets
- 1,000 end users
- 50 vendors
- 28 listed services across 4 categories

### Phase 1 delivery scope
Included now:
- backend APIs
- authentication and account management
- user web app
- vendor web portal
- admin web portal
- booking engine
- notifications foundation
- maps and geo-search integration
- Azure infrastructure and deployment design

Deferred to later phases:
- Android app
- iOS app
- advanced vendor marketplace automation
- real-time dispatch optimization
- loyalty, subscriptions, deep analytics, and AI features

## 3. Recommended Architecture

### 3.1 Architecture style
Use a modular monolith for MVP, deployed as separate frontend and backend applications.

Why:
- faster delivery in 8-12 weeks
- lower operational complexity
- easier testing and deployment for a small first release
- clean path to later split modules into services if scale requires it

### 3.2 High-level components
1. Customer Web App
2. Vendor Portal Web App
3. Admin Portal Web App
4. Backend API platform
5. Primary relational database
6. Cache and session layer
7. File and image storage
8. Notification services
9. Maps and location services
10. Monitoring, logging, and secrets management

## 4. Technology Recommendations

### Frontend
For phase 1, use:
- Next.js web application
- TypeScript
- Tailwind CSS or Material UI
- React Query for API state
- NextAuth or custom JWT/OAuth session integration

Recommended approach:
- one Next.js codebase with role-based sections for customer, vendor, and admin
- shared design system and reusable components

### Backend
Use:
- Node.js with NestJS
- TypeScript
- REST APIs for MVP
- OpenAPI/Swagger documentation
- background jobs for notifications and reminders

Why NestJS:
- strong module boundaries
- fast team onboarding
- built-in validation, auth patterns, and Swagger support

### Database
Use:
- Azure Database for PostgreSQL

Why PostgreSQL:
- strong relational modeling for bookings, vendors, services, reviews, and users
- good support for indexing and geo-adjacent querying patterns
- easy fit for transactional workflows

### Cache / queue
Use:
- Azure Cache for Redis

Use cases:
- OTP/session throttling
- short-lived booking locks
- caching category/service metadata
- background job coordination if needed

### Storage
Use:
- Azure Blob Storage

Use cases:
- vendor profile images
- service images
- uploaded documents in later phases

## 5. Core Functional Modules

### 5.1 Identity and access management
Roles:
- Customer
- Vendor
- Vendor Staff (optional, later)
- Admin
- Support Agent

Authentication methods:
- email + password
- phone number + OTP
- social login placeholder in design, can be added after MVP core auth is stable

Authorization model:
- role-based access control
- resource ownership checks
- admin override for operational support

### 5.2 User profile management
Data managed:
- personal profile
- contact details
- saved addresses
- one or more car profiles
- car metadata such as make, model, registration number, manufacturing year, insurance details

### 5.3 Service catalog
Entities:
- service category
- service definition
- vendor service listing
- price model
- service area coverage

Behavior:
- admin manages master categories and service templates
- vendors publish their own service offerings against supported categories
- customer app shows searchable service catalog with estimated pricing, description, vendor ratings, and booking CTA

### 5.4 Vendor management
Vendor onboarding includes:
- business name
- contact details
- verification status
- operating locations
- supported service categories
- pricing and availability

Vendor portal capabilities:
- manage profile
- manage services
- upload images
- configure service areas
- receive and update booking requests
- view ratings/reviews

### 5.5 Booking system
Booking flow:
1. customer selects service category
2. customer selects service
3. customer enters vehicle and service details
4. system finds eligible vendors by service category and location
5. customer selects vendor and schedule
6. booking is confirmed
7. booking status is updated until completion

Booking modes:
- immediate booking
- scheduled booking

Booking status lifecycle:
- Draft
- PendingVendorAcceptance
- Confirmed
- InProgress
- Completed
- Cancelled
- Failed

MVP rules:
- vendor acceptance can be manual
- no complex dispatch optimization in phase 1
- availability can start with configurable business hours and manual acceptance

### 5.6 Notifications
Channels:
- email
- SMS/OTP
- push notification abstraction for later mobile support
- in-app/web notifications

Event triggers:
- registration and OTP
- booking created
- booking confirmed
- booking cancelled
- service reminder
- promotional messages, only if user consent exists

### 5.7 Support module
MVP support features:
- FAQ pages
- support form / contact request
- emergency contact button
- admin-side ticket visibility

Optional phase 1.5:
- embedded live chat via third-party integration

### 5.8 Reviews and ratings
Users can:
- rate completed bookings
- leave vendor feedback

Controls:
- only completed bookings can be reviewed
- admin moderation capability

## 6. Non-Functional Requirements

### Performance
- support 1,000 users and 50 vendors with room for growth
- p95 API response target under 500 ms for standard reads under expected MVP load
- search and nearby vendor results should feel near real-time

### Security
- HTTPS everywhere
- hashed passwords
- OTP expiry and rate limiting
- RBAC enforcement
- audit logging for admin actions
- secrets stored in Azure Key Vault
- encryption at rest and in transit

### Reliability
- automated backups for PostgreSQL
- health checks for API and frontend
- centralized logging and alerting
- deployment rollback capability

### Scalability
- stateless backend containers
- scale-out web and API independently
- database vertical scaling at MVP stage

### Compliance and privacy
- user consent for marketing communication
- secure handling of PII
- retention policy for logs and user records to be defined with business/legal team

## 7. Data Model Overview

### Main entities
- User
- UserRole
- Vehicle
- Address
- Vendor
- VendorService
- ServiceCategory
- ServiceDefinition
- Booking
- BookingItem
- BookingStatusHistory
- Review
- Notification
- OTPChallenge
- SupportTicket
- AdminAuditLog

### Key relationships
- one user can own many vehicles
- one vendor can publish many vendor services
- one booking belongs to one user, one vehicle, one vendor service, and one vendor
- one booking can have many status history records
- one completed booking can have one review

## 8. Suggested API Domains

### Auth APIs
- register
- login
- social login callback
- request OTP
- verify OTP
- reset password
- refresh token
- logout

### User APIs
- profile CRUD
- vehicle CRUD
- address CRUD
- booking history

### Catalog APIs
- list categories
- list services by category
- service details
- vendor search by service and location

### Booking APIs
- create booking
- pricing estimate
- schedule booking
- cancel booking
- get booking details
- update booking status

### Vendor APIs
- vendor onboarding
- vendor profile management
- vendor service CRUD
- booking inbox
- review listing
- availability settings

### Admin APIs
- user management
- vendor approval and suspension
- booking oversight
- service category management
- review moderation
- reporting endpoints

## 9. Search and Geo-location Design
Use Google Maps Platform for:
- address autocomplete
- geocoding
- location display
- nearby vendor discovery support

MVP geo strategy:
- store vendor operating coordinates and service radius
- store user-selected booking coordinates
- query candidate vendors by city and service area first
- refine by distance calculation in backend or database extension strategy later

For MVP, avoid over-engineering with full geospatial engines unless actual search load requires it.

## 10. Web Application Design

### 10.1 Customer web app
Pages:
- landing page
- sign up / login
- home with 4 service categories
- service listing
- service detail
- booking flow
- my bookings
- profile and vehicles
- support / FAQ

### 10.2 Vendor portal
Pages:
- vendor login/onboarding
- dashboard
- services management
- booking requests
- booking history
- reviews
- account/settings

### 10.3 Admin portal
Pages:
- dashboard
- user management
- vendor approval
- booking oversight
- service catalog management
- support tickets
- audit logs

## 11. Deployment Topology

### Runtime split
- frontend app hosted separately
- backend API hosted separately
- managed database, cache, storage, and secrets services

### Environment strategy
Create at least three environments:
- dev
- staging
- production

## 12. Delivery Approach

### Phase 1, infra + webapp + backend
- Azure foundation
- CI/CD setup
- backend API modules
- web app for customer, vendor, admin
- initial integrations
- monitoring and backups

### Phase 2, mobile apps
- Android and iOS apps using same backend
- push notifications activation
- mobile-specific UX optimizations

## 13. Risks and Mitigations

### Risk: too much scope for MVP timeline
Mitigation:
- keep modular monolith
- delay advanced chat, dispatching, and social login if needed
- deliver manual operational flows first

### Risk: vendor availability data quality
Mitigation:
- start with manual confirmation
- add simple business hours and slot controls

### Risk: third-party dependencies delay release
Mitigation:
- keep third-party integrations behind interfaces
- launch with placeholders or manual workflows where possible

## 14. Recommended Repository Structure

```text
caroner/
  docs/
    technical_design.md
    azure_deployment.md
    api_overview.md
  apps/
    web/
    api/
  packages/
    ui/
    config/
    types/
  infra/
    bicep/
    terraform/
  .github/
    workflows/
```

For now, this document is created at repo root for quick access. It can be moved into `docs/` once the repo structure is expanded.

## 15. Initial Build Recommendation
Build phase 1 as:
- Next.js web frontend
- NestJS backend API
- PostgreSQL database
- Redis cache
- Azure Blob Storage
- Azure Key Vault
- Azure App Service or Azure Container Apps for deployment

Recommendation:
Use Azure Container Apps for backend and web if the team is comfortable with containers. Otherwise use Azure App Service for a simpler first deployment.

## 16. Acceptance Criteria for Phase 1
The phase 1 platform is considered ready when:
- users can register and manage profile and vehicles
- vendors can register and manage service listings
- admins can manage vendors, users, and bookings
- customers can search services, select vendors, and create bookings
- booking notifications are triggered
- application is deployed on Azure with monitored environments
- API documentation is published
- architecture is ready to support later Android and iOS apps
