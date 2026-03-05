# Security Policy

## Supported Versions
Security updates are applied to the latest `main` branch and current deployment branches.

## Reporting a Vulnerability
Please do not open public issues for security vulnerabilities.

Send reports to:
- Email: `support@bizone.trade`

Include:
1. Vulnerability type and impacted area.
2. Reproduction steps.
3. Potential impact.
4. Suggested mitigation (if available).

We will acknowledge reports as soon as possible and provide remediation status updates.

## Secrets and Credentials
1. Never commit real API keys or secrets.
2. Use env files (`backend/.env`, `frontend/.env.local`) for sensitive values.
3. Rotate exposed credentials immediately.
