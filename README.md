# CarOner

CarOner is a car ownership services platform covering emergency, maintenance, convenience, and enhancement workflows.

This repository is currently structured for phase 1 delivery:
- web application
- backend API
- Azure infrastructure
- shared packages and project docs

## Monorepo Structure

```text
caroner/
  apps/
    api/          # NestJS backend API
    web/          # Next.js web app for customer, vendor, and admin roles
  docs/
    technical_design.md
    azure_deployment.md
  infra/
    bicep/        # Azure infrastructure as code
  packages/
    config/       # shared config
    types/        # shared domain types
    ui/           # shared UI components later
  .github/
    workflows/    # CI/CD workflows
```

## Planned Stack
- Frontend: Next.js + TypeScript
- Backend: NestJS + TypeScript
- Database: PostgreSQL
- Cache: Redis
- Storage: Azure Blob Storage
- Infra: Azure + Bicep

## Current Status
- requirements document added
- technical design added
- Azure deployment plan added
- repository scaffold created for implementation

## Next Steps
1. bootstrap `apps/web`
2. bootstrap `apps/api`
3. define shared domain models in `packages/types`
4. add Bicep templates for dev, staging, and prod
5. add CI/CD workflows for lint, test, build, and deploy
