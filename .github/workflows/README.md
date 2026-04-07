# GitHub Workflows

Planned workflows:
- `ci.yml` for lint, test, and build
- `deploy-dev.yml`
- `deploy-staging.yml`
- `deploy-prod.yml`

Suggested pipeline stages:
1. install dependencies
2. run lint
3. run unit tests
4. build apps
5. build and publish containers if used
6. deploy infrastructure updates
7. deploy application updates
