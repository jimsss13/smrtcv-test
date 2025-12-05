# Template Assets (Simulated CDN)

This folder simulates the structure of the Azure Blob Storage container (`smrtcv_stgtemplates`).

## Structure
- `templates.json`: The manifest file that the frontend fetches to know which templates are available.
- `*.png`: Thumbnail images for the templates.
- `*/index.html`: (Future) The actual HTML template files.

## Deployment
In production, the contents of this folder should be uploaded to the Azure Blob Storage container.
The Frontend (SWA) will then fetch them via Azure Front Door using the `NEXT_PUBLIC_CDN_URL` environment variable.
