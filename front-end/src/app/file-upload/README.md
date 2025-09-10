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

## enctype

When you make a POST request, you have to encode the data that forms the body of the request in some way.

HTML forms provide three methods of encoding.

application/x-www-form-urlencoded (the default)
multipart/form-data
text/plain
Work was being done on adding application/json, but that has been abandoned.

When you are writing client-side code:

use multipart/form-data when your form includes any <input type="file"> elements
otherwise you can use multipart/form-data or application/x-www-form-urlencoded but application/x-www-form-urlencoded will be more efficient
When you are writing server-side code:

Use a prewritten form handling library

multipart/form-data is significantly more complicated but it allows entire files to be included in the data. An example of the result can be found in the HTML 4 specification.

```
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8"/>
  <title>upload</title>
</head>
<body>
<form action="http://localhost:8000" method="post" enctype="multipart/form-data">
  <p><input type="text" name="text1" value="text default">
  <p><input type="text" name="text2" value="a&#x03C9;b">
  <p><input type="file" name="file1">
  <p><input type="file" name="file2">
  <p><input type="file" name="file3">
  <p><button type="submit">Submit</button>
</form>
</body>
</html>
```

## 6. Handling multipart/form-data on the Server Side
Handling multipart/form-data varies depending on the server framework you're using. Here’s a quick overview of how to handle it with some popular frameworks:

Node.JS (using Express and multer):

```
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const app = express();

app.post('/upload', upload.single('profile_picture'), (req, res) => {
  console.log(req.body.username); // Access text fields
  console.log(req.file);          // Access the uploaded file
  res.send('File uploaded successfully');
```