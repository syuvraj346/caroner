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

output logAnalyticsWorkspaceName string = logAnalytics.outputs.workspaceName
output keyVaultName string = keyVault.outputs.keyVaultName
output storageAccountName string = storage.outputs.storageAccountName
output redisCacheName string = redis.outputs.redisCacheName
output postgresServerName string = postgres.outputs.postgresServerName
