# Carbon MCP – Terms of Use

_Last updated: October 2025_

These Terms of Use (“Terms”) govern access to and use of the **IBM Cloud deployment of the Carbon MCP Server** (“Carbon MCP”, “the Service”). The Service is an IBM Cloud–hosted Model Context Protocol (MCP) environment for retrieving and analyzing content related to the IBM Carbon Design System.

These Terms apply **only to the hosted IBM Cloud deployment** of Carbon MCP.

The **source code** for the Carbon MCP server is provided separately in this repository under the [Apache License 2.0](./LICENSE). Your rights to use, copy, or modify that open-source code are governed exclusively by the Apache 2.0 license and **not** by these Terms.

By accessing or using the hosted Carbon MCP Service, you agree to be bound by these Terms.  
If you do not agree, you may not access or use the Service.

---

## 1. Acceptable Use

You agree to use Carbon MCP in a responsible manner that complies with all applicable laws, regulations, and IBM policies.

You will **not**:

- Use the Service to violate any applicable law or regulation.  
- Attempt to gain unauthorized access to systems, data, or networks.  
- Interfere with or disrupt the integrity or performance of Carbon MCP or any connected systems.  
- Use the Service to transmit or store content that is unlawful, obscene, defamatory, or otherwise objectionable.  
- Reverse-engineer, decompile, or disassemble any part of Carbon MCP except as permitted by law.  
- Use the Service in any way that could harm IBM, its clients, or third parties.

IBM reserves the right to suspend or terminate access to Carbon MCP for any violation of these Terms.

---

## 2. Relationship to Open Source Code

The Carbon MCP server software distributed in this repository is made available under the **Apache License 2.0**, allowing anyone to self-host or modify the code.  
However, the **IBM Cloud deployment** of that software constitutes a managed IBM service offering and is subject to these Terms, IBM Cloud Acceptable Use Policy, and IBM Privacy Statement.

Use of the hosted Service does **not** grant any additional rights to the underlying source code, Elastic indices, or IBM datasets.

---

## 3. Security and Access

Access to Carbon MCP may require authentication using IBMid, w3id, or other approved identity providers.  
You are responsible for maintaining the confidentiality of your credentials and for all activities performed under your session or account.

IBM implements technical and organizational safeguards to protect the integrity and availability of Carbon MCP.  
You agree to promptly notify the Carbon MCP administrators of any suspected security incident or unauthorized access.

---

## 4. Data Retention and Privacy

Carbon MCP processes limited operational data solely to enable query execution, performance monitoring, and service auditing.  
All processing is performed in accordance with [IBM Privacy Statement](https://www.ibm.com/privacy) and internal data-handling standards.  
No personally identifiable content from your queries or retrieved documents is stored beyond what is required for normal system operation or evaluation.

---

## 5. Telemetry

### 5.1 What data gets collected

When telemetry is enabled, Carbon MCP collects limited, de-identified and anonymized operational data to improve service reliability and relevance.  
Typical telemetry fields may include:

- Timestamp and request type (e.g., `mcp_query`, `auth`, `error`)  
- Query size, latency, and cache performance metrics  
- Session identifiers (UUIDs) used for continuity and authentication  
- Aggregate usage statistics (frequency, success rate, top components, etc.)

Telemetry **does not include** plain-text emails, credentials, documents, or user content beyond the metadata required for metrics.

---

### 5.2 Opting out of IBM Telemetry data collection

You may opt out of telemetry collection at any time by sending a request to Carbon.MCP@ibm.com:

Subject: Carbon MCP telemetry opt-out
Body: Provide your session ID

Once processed:
- All historical telemetry associated with your hashed identity is deleted.
- A durable { "kind": "opt_out" } marker is recorded to prevent future telemetry writes.
- No further usage events (queries, auth, or performance metrics) will be logged for your identity.
- To re-enable telemetry, contact the Carbon MCP administrator or request reinstatement via the MCP management interface.

## 6. Termination
IBM may suspend or terminate your access to the hosted Carbon MCP Service at any time for operational, compliance, or security reasons, or if you violate these Terms.

## 7. Disclaimer of Warranty
The hosted Carbon MCP Service is provided on an “AS IS” and “AS AVAILABLE” basis.
IBM makes no warranties, express or implied, regarding availability, performance, or fitness for a particular purpose.
The open-source Carbon MCP codebase is separately licensed under the Apache License 2.0 and provided without warranty as described in that license.

## 8. Limitation of Liability
To the maximum extent permitted by law, IBM shall not be liable for any indirect, incidental, consequential, or special damages arising out of or in connection with your use of the hosted Carbon MCP Service.

## 9. Modifications
IBM may update these Terms periodically to reflect changes in policy or functionality.
Updated Terms will be posted in this repository. Your continued use of the Service after updates constitutes acceptance of the revised Terms.

© IBM Corporation 2025. All rights reserved.