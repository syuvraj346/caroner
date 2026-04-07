param location string
param webAppName string
param servicePlanId string
param appInsightsConnectionString string
param runtimeStack string = 'NODE|22-lts'
param appSettings object = {}
param tags object = {}

var mergedAppSettings = union({
  WEBSITE_RUN_FROM_PACKAGE: '1'
  SCM_DO_BUILD_DURING_DEPLOYMENT: 'true'
  APPLICATIONINSIGHTS_CONNECTION_STRING: appInsightsConnectionString
}, appSettings)

resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: webAppName
  location: location
  tags: tags
  kind: 'app,linux'
  properties: {
    serverFarmId: servicePlanId
    httpsOnly: true
    siteConfig: {
      linuxFxVersion: runtimeStack
      appSettings: [for key in objectKeys(mergedAppSettings): {
        name: key
        value: string(mergedAppSettings[key])
      }]
      alwaysOn: false
      minTlsVersion: '1.2'
      ftpsState: 'Disabled'
      http20Enabled: true
    }
  }
}

output webAppName string = webApp.name
output defaultHostName string = webApp.properties.defaultHostName
output webAppId string = webApp.id
