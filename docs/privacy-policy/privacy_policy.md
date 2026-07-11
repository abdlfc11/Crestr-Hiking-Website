# Privacy Policy

**Effective Date:** July 11, 2026

This Privacy Policy governs the data collection and privacy practices of **Crestr**, an open-source hiking route planner for Cumbria.
We are committed to maintaining robust privacy protections for our users.
Our data collection is strictly limited to the minimum telemetry necessary to authenticate users and optimise application performance.

---

### 1. Information Collection and Processing

We process two categories of data:

* **Authentication Credentials:** The Application utilises a localised authentication system rather than third-party OAuth providers. To establish an account, we collect a **username and password**. Passwords are encrypted using secure cryptographic hashing algorithms and are utilised solely to authenticate your identity upon login.
* **Aggregated Operational Telemetry:** We utilise Umami, a privacy-focused, open-source web analytics platform, to monitor general application usage. Additionally, we generate custom server-side action logs to monitor critical performance indicators, such as pathfinding latency (e.g., generation time in milliseconds) and route distances.

> **Data Isolation Notice:** All operational telemetry and performance metrics are processed in a completely anonymised state. We do not collect, store, or associate real-world geographic coordinates, device identifiers, or network metadata with your account credentials.

### 2. Legal Basis and Purpose of Processing

We process your data under the following legal frameworks:
- **Contractual Necessity:** Processing account credentials is required to provide the core account management services you request.
- **Legitimate Interests:** Processing anonymous diagnostics allows us to monitor infrastructure health, debug routing algorithms, and improve application stability.

### 3. Data Retention and Third-Party Disclosure

- **Third-Party Transfers:** We do not sell, lease, or distribute user data to third-party commercial entities, marketing networks, or data brokers.
- **Data Retention:** Authentication data is retained indefinitely to maintain your account access. You may execute a data deletion request at any time to permanently purge your credentials from our active databases.

### 4. Source Code and Transparency

As an open-source project, our data handling pipelines, security implementations, and telemetry mechanisms are fully transparent and publicly auditable within our source code repository.