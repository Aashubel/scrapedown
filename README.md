# Scrapedown

This project is a Cloudflare worker designed to scrape web pages and extract useful information, including a markdown-formatted version of the content.
It's built to handle requests to scrape a given URL and return structured data about the page.

## Features

- Fetch and scrape content from any given URL.
- Extract metadata such as title, byline, excerpt, and more.
- Convert HTML content to clean markdown format.
- Handle requests with optional markdown formatting.
- Remove everything but the content (Reader Mode)

## Usage

To use this worker, send a GET request to the worker's endpoint with the `url` query parameter specifying the page to be scraped.
Optionally, you can include the `markdown` query parameter to specify whether the content should be returned in markdown format (default: `true`).

### Example Request

```sh
GET https://<worker-name>.workers.dev/?url=https://example.com&markdown=true
```

### Example Response

```json
{
  "byline": "SVT Nyheter",
  "date": "2024-11-14T09:22:55+01:00",
  "image": "...",
  "textContent": "...",
  "title": "Ministerns bananfobi: ”Väldigt ovanlig”"
}
```
