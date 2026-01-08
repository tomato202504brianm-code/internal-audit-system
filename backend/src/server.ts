const app = require('./app').default;

const PORT = 50000;

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
