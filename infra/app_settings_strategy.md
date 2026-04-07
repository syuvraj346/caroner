# CarOner App Settings and Connection Strategy

## Purpose
This document defines how application configuration should be managed for the CarOner web and API apps on Azure.

## Principles
- do not hardcode secrets in source code
- keep non-secret settings in App Service application settings
- keep secrets in Azure Key Vault
- use environment-specific values per dev, staging, and prod
- keep names consistent across web and API services

## Configuration Ownership
### Azure App Service
Store:
- runtime environment values
- feature flags
- non-secret hostnames
- service URLs
- public client configuration when needed

### Azure Key Vault
Store:
- database connection strings
- JWT signing secrets
- Redis connection string
- storage access secrets if required
- SMS provider credentials
- email provider credentials
- Google Maps API secrets if restricted server-side
- OAuth client secrets

## Web App Settings
Suggested initial settings for `app-caroner-web-dev`:
- `NODE_ENV=production`
- `NEXT_PUBLIC_APP_ENV=dev`
- `NEXT_PUBLIC_API_BASE_URL=https://app-caroner-api-dev.azurewebsites.net`
- `NEXT_PUBLIC_GOOGLE_MAPS_KEY=<public-client-key-if-used>`
- `APPLICATIONINSIGHTS_CONNECTION_STRING=<from-app-insights>`

## API App Settings
Suggested initial settings for `app-caroner-api-dev`:
- `NODE_ENV=production`
- `PORT=8080`
- `APP_ENV=dev`
- `APP_BASE_URL=https://app-caroner-api-dev.azurewebsites.net`
- `WEB_BASE_URL=https://app-caroner-web-dev.azurewebsites.net`
- `DATABASE_URL=<from-key-vault-or-app-setting>`
- `REDIS_URL=<from-key-vault-or-app-setting>`
- `JWT_SECRET=<from-key-vault>`
- `STORAGE_ACCOUNT_NAME=stcaronerdev01`
- `AZURE_KEY_VAULT_NAME=kv-caroner-dev-01`
- `APPLICATIONINSIGHTS_CONNECTION_STRING=<from-app-insights>`

## Near-Term Implementation Recommendation
For MVP dev:
1. keep non-secret settings directly in App Service settings
2. inject secrets manually from Azure portal or CLI into App Service settings
3. move to Key Vault references once app identity and secret access are wired

## Next Hardening Step
Enable managed identity on web and API App Service resources, then use Key Vault references for:
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`
- third-party integration secrets

## Deployment Notes
When app deployment starts, configure application settings before the first production-like smoke test.

Suggested order:
1. deploy infra
2. enable identities if needed
3. set secrets
4. set app settings
5. deploy code
6. run smoke tests
