# Contributing to Bizone

## Setup
1. Install Node.js `>=20.9.0` and pnpm `>=10`.
2. Install dependencies in root, backend, and frontend where needed.
3. Copy env templates:
   - `backend/.env.example` -> `backend/.env`
   - `frontend/.env.example` -> `frontend/.env.local`

## Branching
1. Create a feature branch from `main`.
2. Use clear branch names, e.g. `feat/order-realtime`, `fix/auth-login`.

## Coding Guidelines
1. Keep changes scoped and avoid unrelated edits.
2. Preserve existing architecture (API modules, hooks, stores, components).
3. Add or update docs when behavior changes.

## Validation Before PR
1. Backend:
   - `cd backend && npm run lint`
2. Frontend:
   - `cd frontend && npx tsc --noEmit --pretty false`
   - `cd frontend && npm run lint`
3. Manual smoke checks:
   - Auth login/register
   - Dashboard load
   - Product/order flows
   - WhatsApp and realtime paths where applicable

## Pull Request Checklist
1. Describe the problem and the fix.
2. Include screenshots for UI changes.
3. Mention env variables added/changed.
4. Confirm lint/type checks pass.
