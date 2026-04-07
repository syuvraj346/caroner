targetScope = 'resourceGroup'

@description('Azure region for deployed resources')
param location string = resourceGroup().location

@description('Environment short name, for example dev, staging, or prod')
param environmentName string = 'dev'

@description('Log Analytics workspace name')
param logAnalyticsWorkspaceName string

@description('Key Vault name')
param keyVaultName string

@description('Storage account name')
param storageAccountName string

@description('Redis cache name')
param redisCacheName string

@description('PostgreSQL flexible server name')
param postgresServerName string

@description('PostgreSQL admin username')
param postgresAdminUser string

@secure()
@description('PostgreSQL admin password')
param postgresAdminPassword string

@description('Application Insights resource name')
param applicationInsightsName string

@description('App Service plan name')
param appServicePlanName string

@description('Customer and shared web app name')
param webFrontendAppName string

@description('Backend API app name')
param apiAppName string

@description('Tags applied to all supported resources')
param tags object = {
  app: 'caroner'
  environment: environmentName
}

module logAnalytics './modules/log-analytics.bicep' = {
  name: 'logAnalyticsDeployment'
  params: {
    location: location
    workspaceName: logAnalyticsWorkspaceName
    tags: tags
  }
}

module keyVault './modules/key-vault.bicep' = {
  name: 'keyVaultDeployment'
  params: {
    location: location
    keyVaultName: keyVaultName
    tenantId: subscription().tenantId
    tags: tags
  }
}

module appInsights './modules/application-insights.bicep' = {
  name: 'applicationInsightsDeployment'
  params: {
    location: location
    applicationInsightsName: applicationInsightsName
    workspaceResourceId: logAnalytics.outputs.workspaceId
    tags: tags
  }
}

module appServicePlan './modules/app-service-plan.bicep' = {
  name: 'appServicePlanDeployment'
  params: {
    location: location
    appServicePlanName: appServicePlanName
    tags: tags
  }
}

module storage './modules/storage-account.bicep' = {
  name: 'storageDeployment'
  params: {
    location: location
    storageAccountName: storageAccountName
    tags: tags
  }
}

module redis './modules/redis.bicep' = {
  name: 'redisDeployment'
  params: {
    location: location
    redisCacheName: redisCacheName
    tags: tags
  }
}

module postgres './modules/postgres-flexible-server.bicep' = {
  name: 'postgresDeployment'
  params: {
    location: location
    postgresServerName: postgresServerName
    administratorLogin: postgresAdminUser
    administratorLoginPassword: postgresAdminPassword
    tags: tags
  }
}

module webFrontend './modules/linux-web-app.bicep' = {
  name: 'webFrontendDeployment'
  params: {
    location: location
    webAppName: webFrontendAppName
    servicePlanId: appServicePlan.outputs.appServicePlanId
    appInsightsConnectionString: appInsights.outputs.connectionString
    appSettings: {
      NODE_ENV: 'production'
      PORT: '3000'
    }
    tags: union(tags, {
      component: 'web'
    })
  }
}

module apiApp './modules/linux-web-app.bicep' = {
  name: 'apiAppDeployment'
  params: {
    location: location
    webAppName: apiAppName
    servicePlanId: appServicePlan.outputs.appServicePlanId
    appInsightsConnectionString: appInsights.outputs.connectionString
    appSettings: {
      NODE_ENV: 'production'
      PORT: '8080'
    }
    tags: union(tags, {
      component: 'api'
    })
  }
}

output logAnalyticsWorkspaceName string = logAnalytics.outputs.workspaceName
output applicationInsightsName string = appInsights.outputs.applicationInsightsName
output appServicePlanName string = appServicePlan.outputs.appServicePlanName
output keyVaultName string = keyVault.outputs.keyVaultName
output storageAccountName string = storage.outputs.storageAccountName
output redisCacheName string = redis.outputs.redisCacheName
output postgresServerName string = postgres.outputs.postgresServerName
output webFrontendHostName string = webFrontend.outputs.defaultHostName
output apiAppHostName string = apiApp.outputs.defaultHostName
