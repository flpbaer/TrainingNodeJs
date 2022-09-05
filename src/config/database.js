const mongoose = require("mongoose");

const url = "mongodb+srv://cSegalas:<password>@cluster0.cdqedf5.mongodb.net/?retryWrites=true&w=majority";
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
