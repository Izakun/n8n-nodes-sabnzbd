<img src="nodes/Sabnzbd/sabnzbd.svg" width="90" align="right" alt="SABnzbd" />

# n8n-nodes-sabnzbd

[![npm version](https://img.shields.io/npm/v/n8n-nodes-sabnzbd.svg)](https://www.npmjs.com/package/n8n-nodes-sabnzbd)
[![License: MIT](https://img.shields.io/npm/l/n8n-nodes-sabnzbd.svg)](./LICENSE)

Community node for n8n to control a [SABnzbd](https://sabnzbd.org/) usenet downloader
through its HTTP API.

## Installation

In n8n: **Settings → Community Nodes → Install** and enter `n8n-nodes-sabnzbd`.

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

## Disclaimer

This project isn't affiliated with or endorsed by the SABnzbd project. SABnzbd is the
property of its respective authors.
