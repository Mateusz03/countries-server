const app = require("./src/app");

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`App listen on http://localhost:${PORT}/`);
});
