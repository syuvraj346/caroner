using '../main.bicep'

param location = 'centralindia'
param environmentName = 'dev'
param logAnalyticsWorkspaceName = 'log-caroner-dev'
param keyVaultName = 'kv-caroner-dev-01'
param storageAccountName = 'stcaronerdev01'
param redisCacheName = 'redis-caroner-dev-01'
param postgresServerName = 'psql-caroner-dev-01'
param postgresAdminUser = 'caroneradmin'

// Set securely at deploy time or replace with a Key Vault reference pattern.
param postgresAdminPassword = '<SET_AT_DEPLOY_TIME>'
