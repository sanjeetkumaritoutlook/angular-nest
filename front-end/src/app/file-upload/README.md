Result

File input resets after upload.

Success message stays visible until you manually clear or select a new file.

Spinner works as before.

## Busboy

What it is:
busboy is a low-level Node.js streaming parser for processing form data, especially multipart/form-data (used in file uploads).

Why it exists:
When a browser uploads a file, it doesn’t just send raw bytes — it sends a multipart request (with boundaries, headers, etc.). busboy parses that stream efficiently without loading everything into memory.

Use case:
Developers can use busboy directly if they want fine-grained control over how uploads are handled (streaming files to S3, validating chunks, etc.).

## Multer

What it is:
multer is a middleware for handling multipart/form-data in Express/NestJS.

How it works:
Internally, multer uses busboy under the hood to parse incoming file streams.

Why use multer instead of busboy directly?
Because multer provides a higher-level API:

FileInterceptor in NestJS

Easy config for storage (disk or memory)

File size limits

File filters

Automatically populates req.file or req.files

So → multer = wrapper on top of busboy that makes file uploads much easier in Express/NestJS.

usually you don’t mix them in the same upload endpoint — you pick one depending on your needs.

✅ When to use Multer

You want a quick, high-level API.

Typical NestJS/Angular file uploads (like your current controller).

You need to store files on disk or in memory before processing.

You’re okay with the file being fully buffered (into memory or disk).

✅ When to use Busboy directly

You need streaming uploads (e.g., uploading large files directly to S3, GCS, Azure Blob).

You want full control of how file chunks are processed.

You want to avoid buffering the whole file into memory/disk.

Example: uploading a 2 GB video → Multer would choke, Busboy streams it.

⚖️ Can you use both?

Yes — in the same project, but for different routes.

Small files → Multer (/upload)

Large streaming uploads → Busboy (/stream-upload)

But don’t combine them on the same route (Multer already uses Busboy internally; you’d be duplicating work).