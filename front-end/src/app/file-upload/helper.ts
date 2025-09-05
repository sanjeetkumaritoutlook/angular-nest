export function getApiUrl(): string {
  const host = window.location.hostname;
  if (host === 'localhost' || host === '127.0.0.1' || host === '::1') {
    return 'http://localhost:3000'; // your local Nest server
  }
  return 'https://angular-nest-zu4y.onrender.com'; // production API (change to your real URL)
}