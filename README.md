<img src="nodes/Sabnzbd/sabnzbd.svg" width="90" align="right" alt="SABnzbd" />

# n8n-nodes-sabnzbd

[![npm version](https://img.shields.io/npm/v/n8n-nodes-sabnzbd.svg)](https://www.npmjs.com/package/n8n-nodes-sabnzbd)
[![npm downloads](https://img.shields.io/npm/dm/n8n-nodes-sabnzbd.svg)](https://www.npmjs.com/package/n8n-nodes-sabnzbd)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-sabnzbd.svg)](./LICENSE)
[![n8n verified](https://img.shields.io/badge/n8n-verified%20community%20node-EA4B71)](https://docs.n8n.io/integrations/community-nodes/installation/verified-install/)

Community node for n8n to control a [SABnzbd](https://sabnzbd.org/) usenet downloader
through its HTTP API.

> ✅ **Verified community node** — installable directly from the n8n node panel
> (self-hosted **and** n8n Cloud).

## Installation

This is a **verified** community node: in n8n click **+ (Add node)**, search for
**SABnzbd**, and add it — no manual install needed.

<details>
<summary>Manual install (older n8n, or as an unverified package)</summary>

Go to **Settings → Community Nodes → Install** and enter `n8n-nodes-sabnzbd`.
</details>

## Operations

| Operation | SABnzbd mode |
|---|---|
| Get Version | `version` |
| Get Queue | `queue` |
| Get History | `history` |
| Get Server Stats | `server_stats` |
| Pause Queue | `pause` |
| Resume Queue | `resume` |
| Add URL | `addurl` (+ category, name, priority) |

## Credentials

Create a **SABnzbd API** credential:
- **Base URL** — e.g. `http://sabnzbd:8080` (the node calls `/api`).
- **API Key** — SABnzbd → Config → General → API Key. Sent as the `apikey` query parameter.

## Usage example

Read the download queue:

1. Add the node after a trigger (e.g. *When clicking 'Test workflow'*).
2. Select your credential.
3. **Get Queue**.
4. Execute the node — example output:

```json
{ "status": "Downloading", "speed": "5.2 M", "noofslots": 2, "timeleft": "0:04:12" }
```

## Disclaimer

This project isn't affiliated with or endorsed by the SABnzbd project. SABnzbd is the
property of its respective authors.
