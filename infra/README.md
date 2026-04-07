# Infrastructure

Infrastructure code for CarOner should live here.

## Layout
- `bicep/` for Azure resource definitions
- optional future `scripts/` for deployment helpers

## Goals
- reproducible environment provisioning
- separate dev, staging, and production parameters
- secure secret handling via Azure Key Vault
- support for web and API deployment targets
