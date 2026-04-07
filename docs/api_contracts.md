# CarOner API Contracts, Foundation Slice

## Base path
- `/api`

## Root and health
- `GET /` - root service response
- `GET /version` - version response
- `GET /api/health` - health response

## Auth
- `POST /api/auth/login`
- `POST /api/auth/otp/request`

## Users
- `GET /api/users`
- `POST /api/users`

## Vehicles
- `GET /api/vehicles`
- `POST /api/vehicles`

## Vendors
- `GET /api/vendors`
- `POST /api/vendors`

## Bookings
- `GET /api/bookings`
- `POST /api/bookings`

## Notes
These are initial contract endpoints returning foundation responses. Persistence and domain logic are the next step.
