# Security Policy

## Reporting a Vulnerability

This is a portfolio/demo project and does not handle real user data or payment information. However, if you discover a security vulnerability, please report it responsibly.

**Please do NOT open a public GitHub issue for security vulnerabilities.**

Instead, contact me directly:

- **Email**: [mifdlaltsaqibalf26@outlook.com](mailto:mifdlaltsaqibalf26@outlook.com)
- **LinkedIn**: [Mifdlal Tsaqib Alfarras](https://www.linkedin.com/in/mifdlal-tsaqib-alfarras/)

### What to Include

- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Response Time

I will acknowledge receipt within 48 hours and provide an initial assessment within 5 business days.

## Current Security Measures

This project implements the following security measures:

- **Honeypot field** — Hidden form field to catch automated bots
- **Timestamp check** — Rejects form submissions made faster than 3 seconds
- **Rate limiting** — Max 3 submissions per IP per 60 seconds (in-memory)
- **Input sanitization** — HTML tags stripped from all text inputs
- **maxLength constraints** — All form fields have character limits
- **Zod validation** — Server-side schema validation for all form data
- **No hardcoded secrets** — All credentials via environment variables
- **CSRF protection** — Built-in Next.js Server Action protection
- **No database** — All content is static; no user data stored

## Scope

This security policy applies to the `Mahoni-House` repository and its deployed instance on Vercel.

## Disclaimer

This is a fictional demo project. The villa, owners, pricing, and testimonials are not real. No actual booking or payment functionality exists.
