# Azure Bicep Templates

This folder contains the first Bicep templates for CarOner infrastructure.

## Files
- `main.bicep` - resource-group scoped deployment entrypoint
- `modules/` - reusable Azure resource modules
- `params/dev.bicepparam` - development environment parameters

## Current Coverage
The initial Bicep baseline models:
- Log Analytics Workspace
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
- This currently models the manually created dev baseline.
- App hosting resources for web and API are not included yet.
- Networking is intentionally minimal for MVP speed and should be hardened before staging or production.
