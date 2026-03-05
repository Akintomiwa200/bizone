# Release Checklist

## Pre-Release
1. Update `CHANGELOG.md`.
2. Verify env templates are up to date:
   - `.env.example`
   - `backend/.env.example`
   - `frontend/.env.example`
3. Confirm Node/pnpm versions match project requirements.

## Quality Gates
1. Backend lint passes.
2. Frontend lint passes.
3. Frontend TypeScript check passes.
4. Critical flows manually tested:
   - Auth
   - Products
   - Orders
   - Delivery
   - Payment initialization/verification
   - WhatsApp webhook and realtime events

## Security
1. No secrets committed.
2. API keys rotated if exposure occurred.
3. Security headers and rate limiting enabled in production.

## Deployment
1. Deploy backend.
2. Deploy frontend.
3. Verify health endpoint and dashboard login.
