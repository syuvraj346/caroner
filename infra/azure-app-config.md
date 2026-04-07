# Azure App Configuration Steps, CarOner Dev

## Web App, `app-caroner-web-dev`
Recommended app settings:
- `NODE_ENV=production`
- `NEXT_PUBLIC_APP_ENV=dev`
- `NEXT_PUBLIC_API_BASE_URL=https://app-caroner-api-dev.azurewebsites.net/api`

## API App, `app-caroner-api-dev`
Recommended app settings:
- `NODE_ENV=production`
- `PORT=8080`
- `APP_ENV=dev`
- `APP_BASE_URL=https://app-caroner-api-dev.azurewebsites.net`
- `WEB_BASE_URL=https://app-caroner-web-dev.azurewebsites.net`
- `DATABASE_URL=<postgres-connection-string>`
- `REDIS_URL=<redis-connection-string>`
- `JWT_SECRET=<secret>`

## Azure CLI examples
```powershell
az webapp config appsettings set --resource-group rg-caroner-dev --name app-caroner-web-dev --settings NODE_ENV=production NEXT_PUBLIC_APP_ENV=dev NEXT_PUBLIC_API_BASE_URL=https://app-caroner-api-dev.azurewebsites.net/api

az webapp config appsettings set --resource-group rg-caroner-dev --name app-caroner-api-dev --settings NODE_ENV=production PORT=8080 APP_ENV=dev APP_BASE_URL=https://app-caroner-api-dev.azurewebsites.net WEB_BASE_URL=https://app-caroner-web-dev.azurewebsites.net DATABASE_URL="<postgres-connection-string>" REDIS_URL="<redis-connection-string>" JWT_SECRET="<secret>"
```

## Next hardening step
Move secrets into Key Vault references after managed identity is enabled on both apps.
