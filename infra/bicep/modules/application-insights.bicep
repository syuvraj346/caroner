param location string
param applicationInsightsName string
param workspaceResourceId string
param tags object = {}

resource appInsights 'Microsoft.Insights/components@2020-02-02' = {
  name: applicationInsightsName
  location: location
  kind: 'web'
  tags: tags
  properties: {
    Application_Type: 'web'
    WorkspaceResourceId: workspaceResourceId
    IngestionMode: 'LogAnalytics'
  }
}

output applicationInsightsName string = appInsights.name
output applicationInsightsId string = appInsights.id
output connectionString string = appInsights.properties.ConnectionString
