# Azure Bicep Templates

This folder will contain Azure Bicep modules and environment parameter files.

Suggested future structure:

```text
bicep/
  main.bicep
  modules/
    app-service.bicep
    postgres.bicep
    redis.bicep
    storage.bicep
    key-vault.bicep
    monitoring.bicep
  params/
    dev.bicepparam
    staging.bicepparam
    prod.bicepparam
```

## First templates to add
- resource group level deployment
- app hosting resources
- PostgreSQL server
- Redis cache
- Storage account
- Key Vault
- Application Insights and Log Analytics
