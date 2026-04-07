param location string
param redisCacheName string
param tags object = {}

resource redis 'Microsoft.Cache/Redis@2024-03-01' = {
  name: redisCacheName
  location: location
  tags: tags
  properties: {
    sku: {
      name: 'Basic'
      family: 'C'
      capacity: 0
    }
    minimumTlsVersion: '1.2'
    publicNetworkAccess: 'Enabled'
    redisConfiguration: {}
  }
}

output redisCacheName string = redis.name
output redisCacheId string = redis.id
