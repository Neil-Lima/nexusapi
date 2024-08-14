require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5001;

// Habilitar CORS
app.use(cors());

// Conexão com o MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão:'));
db.once('open', function() {
  console.log('Conectado ao MongoDB Atlas');
});

// Rota de boas-vindas
app.get('/', (req, res) => {
  res.json({ mensagem: 'Bem-vindo à API do Nexus Api!!!' });
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
