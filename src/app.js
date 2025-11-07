const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (_req, res) => {
  res.send('Hello from CI/CD pipeline 🚀');
});

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app; // needed for testing
