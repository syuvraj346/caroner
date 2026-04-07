# Azure Bicep Templates

This folder contains the first Bicep templates for CarOner infrastructure.

## Files
- `main.bicep` - resource-group scoped deployment entrypoint
- `modules/` - reusable Azure resource modules
- `params/dev.bicepparam` - development environment parameters

## Current Coverage
The current Bicep baseline models:
- Log Analytics Workspace
- Application Insights
- App Service Plan
- Linux Web App for frontend
- Linux Web App for API
- Key Vault
- Storage Account
- Redis Cache
- PostgreSQL Flexible Server

## Deployment Example
```powershell
az deployment group create \
  --resource-group rg-caroner-dev \
  --template-file infra/bicep/main.bicep \
  --parameters infra/bicep/params/dev.bicepparam \
  --parameters postgresAdminPassword="<secure-password>"
```

## Notes
- This models the manually created dev baseline plus MVP-ready app hosting resources.
- Web and API hosting are currently defined with Azure App Service on Linux.
- Networking is intentionally minimal for MVP speed and should be hardened before staging or production.
