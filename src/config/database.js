const mongoose = require("mongoose");

const url = "url-do-banco";
mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    console.log("Conectado ao banco de dados.");
  })
  .catch((error) => {
    console.error("Erro:", error);
    process.exit();
  });

module.exports = mongoose;
