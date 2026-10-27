# Carbon MCP – Terms of Use

_Last updated: October 27, 2026_

These Terms of Use (“Terms”) govern access to and use of the **IBM Cloud deployment of the Carbon MCP Server** (“Carbon MCP”, “the Service”). The Service is an IBM Cloud–hosted Model Context Protocol (MCP) environment for retrieving and analyzing content related to the IBM Carbon Design System.

By accessing or using the hosted Carbon MCP Service, you agree to be bound by these Terms. Use of the hosted Service does **not** grant any additional rights to the underlying source code, database(s), or IBM datasets.

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

### 1.1 Content you submit

Your coding agent decides what to send to Carbon MCP based on your instructions. You are responsible for what you and your agent submit. Do not submit personal data, credentials or confidential information that the task does not need. Carbon MCP processes submitted content only to provide the requested result, as described in section 3. Your agent and its AI provider handle your code under their own terms, not these Terms.

IBM reserves the right to suspend or terminate access to Carbon MCP for any violation of these Terms.

---

## 2. Security and Access

Access to Carbon MCP may require authentication using IBMid, w3id, or other approved identity providers.  
You are responsible for maintaining the confidentiality of your credentials and for all activities performed under your session or account.

IBM implements technical and organizational safeguards to protect the integrity and availability of Carbon MCP.  
You agree to promptly notify the Carbon MCP administrators of any suspected security incident or unauthorized access.

---

## 3. Data handling and privacy

**In short.** Your coding agent reads your code to complete the task you give it. When the agent calls Carbon MCP, it sends the code needed for that task, and Carbon MCP uses it only to return a result.

### 3.1 How Carbon MCP uses the code you send

A coding agent works by reading and changing your code to complete a task. When your agent calls a Carbon MCP tool such as `code_audit`, it sends the code that tool needs. Carbon MCP uses that code the same way: only to check it and return the result to your agent, in the same request. The code is processed in memory and is not written to disk, logs or any database. Results, which can include short excerpts of the code, are held in memory for up to one hour so a repeated request is faster, and are then discarded.

### 3.2 Your identity

You sign in with IBMid. Carbon MCP does not store your email address in its records. It derives an identifier from your email with a keyed hash (HMAC-SHA256) and uses that identifier for access, telemetry and the records described below. The identifier is pseudonymous: IBM can match it to your email when it needs to, for example to process an opt-out or a data request.

### 3.3 Records of your acceptance

When you agree to these Terms, Carbon MCP records your identifier, the version of the Terms, the date and time, and the client you connected with. IBM keeps these records as evidence of your agreement, including after you opt out of telemetry under section 4.2.

### 3.4 Feedback contact

If you choose to be contacted for feedback, Carbon MCP records that choice against your identifier. You can withdraw it at any time by writing to Carbon.MCP@ibm.com.

### 3.5 Privacy statement

All processing follows the [IBM Privacy Statement](https://www.ibm.com/privacy), which describes your rights and how to exercise them.

---

## 4. Telemetry

### 4.1 What data gets collected

When telemetry is enabled, Carbon MCP collects limited operational data linked to your pseudonymous identifier (section 3.2) to improve service reliability and relevance. Typical telemetry fields may include:

- Timestamp and request type (e.g., `mcp_query`, `auth`, `error`)  
- Your pseudonymous identifier and your email domain  
- The client's user agent  
- Query size, latency, and cache performance metrics  
- Session identifiers (UUIDs) used for continuity and authentication  
- Aggregate usage statistics (frequency, success rate, top components, etc.)

Telemetry **does not include** plain-text emails, credentials, documents, the code you submit, or user content beyond the metadata required for metrics.

### 4.2 Opting out of IBM Telemetry data collection

You may opt out of telemetry collection at any time by sending a request to Carbon.MCP@ibm.com:

Subject: Carbon MCP telemetry opt-out
Body: Provide your session ID

Once processed:
- All historical telemetry associated with your hashed identity is deleted.
- A durable { "kind": "opt_out" } marker is recorded to prevent future telemetry writes.
- No further usage events (queries, auth, or performance metrics) will be logged for your identity.
- To re-enable telemetry, contact the Carbon MCP administrator or request reinstatement via the MCP management interface.

---

## 5. Termination

IBM may suspend or terminate your access to the hosted Carbon MCP Service at any time for operational, compliance, or security reasons, or if you violate these Terms.

---

## 6. Disclaimer of Warranty

The hosted Carbon MCP Service is provided on an “AS IS” and “AS AVAILABLE” basis.
IBM makes no warranties, express or implied, regarding availability, performance, or fitness for a particular purpose.
The open-source Carbon MCP codebase is separately licensed under the Apache License 2.0 and provided without warranty as described in that license.

---

## 7. Limitation of Liability

To the maximum extent permitted by law, IBM shall not be liable for any indirect, incidental, consequential, or special damages arising out of or in connection with your use of the hosted Carbon MCP Service.

---

## 8. Modifications

IBM may update these Terms periodically to reflect changes in policy or functionality.
Updated Terms will be posted in this repository. Your continued use of the Service after updates constitutes acceptance of the revised Terms.

© IBM Corporation 2026. All rights reserved.