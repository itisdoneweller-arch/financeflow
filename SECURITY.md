# Security Policy

## Reporting Vulnerabilities

If you discover a security vulnerability, please **DO NOT** open a public issue. Instead:

1. Email security@financeflow.com with:
   - Description of vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

2. We'll acknowledge within 48 hours
3. We'll work with you on a fix and responsible disclosure

## Supported Versions

| Version | Supported |
|---------|-----------|
| 1.0.x   | ✅ Yes    |
| < 1.0   | ❌ No     |

## Security Best Practices

### For Contributors
- Never commit API keys or secrets
- Use environment variables for sensitive data
- Validate and sanitize all user inputs
- Follow OWASP guidelines
- Keep dependencies updated

### For Users
- Use strong passwords (12+ characters)
- Enable two-factor authentication
- Keep your account email updated
- Report suspicious activity

## Security Features

### Authentication
- ✅ JWT tokens with expiration
- ✅ Bcrypt password hashing
- ✅ OAuth 2.0 support (Google, Apple)
- ✅ Two-factor authentication (TOTP)
- ✅ Refresh token rotation

### Data Protection
- ✅ End-to-end encryption (in transit)
- ✅ Database encryption at rest
- ✅ PII handling compliance
- ✅ GDPR data deletion
- ✅ Regular security audits

### API Security
- ✅ Rate limiting
- ✅ CORS protection
- ✅ CSRF tokens
- ✅ SQL injection prevention
- ✅ XSS protection

## Dependencies

We regularly update dependencies using:
- Dependabot
- npm audit
- SNYK security scanning

## Compliance

- GDPR compliant data handling
- PCI DSS ready (for future payment processing)
- SOC 2 audit ready
- ISO 27001 aligned

## Contact

- Security email: security@financeflow.com
- Support email: support@financeflow.com
