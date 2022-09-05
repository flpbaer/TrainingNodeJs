require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

//===== 

app.use(express.json());
app.use(cors());

//=== Open Route

app.get("/", (req, res) => {
  res.status(200).json({ msg: "Deu boa, bem vindo" });
});

//=== Models

const UserModel = require("./models/UserModel");
const CounterModel = require("./models/CounterModel");

//=== Register usuário

app.post("/auth/register", async (req, res) => {
    const { username, password, confirmpassword } = req.body;
  
    //==== Validação
  
    if (!username) {
      return res.status(422).json({ msg: "O nome de usuário é obrigatório" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória" });
    }
    if (password !== confirmpassword) {
      return res.status(422).json({ msg: "As senhas não conferem" });
    }
  
    //=== Ve se ja existe algum usuário cadastro com esse email
  
    const userExists = await UserModel.findOne({ username: username });
  
    if (userExists) {
      return res.status(422).json({ msg: "Por favor, utilize outro nome de usuario!" });
    }
  
    //==== Cria senha
  
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);
  
    const userSave = new UserModel({
      username,
      email,
      password: passwordHash,
    });
  
    try {
      await userSave.save();
  
      res.status(201).json({ msg: "Usuário criado com sucesso!" });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ msg: "Erro interno no servidor, tente novamente mais tarde" });
    }
  });
  
  //==== Login
  
  app.post("/auth/login", async (req, res) => {
    const { username, password } = req.body;
  
    //=== Validação
  
    if (!username) {
      return res.status(422).json({ msg: "O username é obrigatóro" });
    }
    if (!password) {
      return res.status(422).json({ msg: "A senha é obrigatória" });
    }
  
    //==== Ve se o usuário existe
  
    const user = await UserModel.findOne({ username: username });
  
    if (!username) {
      return res.status(422).json({ msg: "Usuário não encontrado ou incorreto" });
    }
  
    //=== Ve se a senha é valida - coincide
  
    const checkPassword = await bcrypt.compare(password, user.password);
  
    if (!checkPassword) {
      return res.status(422).json({ msg: "Senha incorreta" });
    }
  
    try {
      const secret = process.env.SECRET;
  
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
  
      res.status(200).json({ msg: "Autenticação realizada com sucesso", token });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ msg: "Erro interno no servidor, tente novamente mais tarde" });
    }
  });

  //=== Criar novo produto


  app.post("/create/product", async (req, res) => {
    const {nameProd, codProduct, quantity, peso} = req.body;

    if(!nameProd) {
        res.status(422).json({msg: "Você precisa adicionar o nome do produto"})
    }
    if(!codProduct) {
        res.status(422).json({msg: "Você precisa adicionar o código do produto"})
    }
    if(!quantity) {
        res.status(422).json({msg: "Você precisa colocar a quantidade do produto"})
    }
    if(!peso) {
        res.status(422).json({msg: "Você precisa adicionar quanto pesa o produto"})
    }

    const productSave = new CounterModel({
        nameProd,
        codProduct,
        quantity,
        peso,
    });

    try {
        await messageSave.save();
    
        res.status(201).json({ msg: "criado com sucesso" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "deu biziu" });
      }
  })


//== Conexão com o banco

const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPass}@cluster0.cdqedf5.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Database connected");
    app.listen(2222);
  })
  .catch((err) => console.log(err));
