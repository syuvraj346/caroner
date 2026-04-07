# Azure Dev Resources, CarOner

This file records the first manually provisioned Azure development resources for CarOner.

## Subscription
- Name: `Azure subscription 1`
- ID: `aec1b19c-2c1e-44a0-82bc-964cd4aa5993`

## Region
- `centralindia`

## Resource Group
- `rg-caroner-dev`

## Provisioned Resources
- Log Analytics Workspace: `log-caroner-dev`
- Key Vault: `kv-caroner-dev-01`
- Storage Account: `stcaronerdev01`
- Redis Cache: `redis-caroner-dev-01`
- PostgreSQL Flexible Server: `psql-caroner-dev-01`

## Notes
- PostgreSQL public network access is currently enabled for MVP setup speed.
- Resource providers for Redis and PostgreSQL were auto-registered during first creation.
- App hosting for web and API is not created yet.
- Infrastructure should be codified into Bicep next, so the environment becomes reproducible.

## Recommended Next Azure Steps
1. Deploy App Service plan and web/API apps from Bicep.
2. Add Application Insights and alert rules tied to Log Analytics.
3. Move secrets into Key Vault.
4. Add CI/CD deployment workflows.
5. Lock down network access before staging/production.
