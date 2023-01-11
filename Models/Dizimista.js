const mongoose = require('mongoose')
const DizimistaSchema = new mongoose.Schema({
  Nome: String,
  Email: String,
  Nucleo_id: {type: mongoose.Schema.Types.ObjectId, ref: 'Nucleo'},
  Cartao: String,
  data_criacao: {type: Date, default: Date.now},
  data_actualizacao: {type: Date, default: Date.now }
})

const DizimistaModel = new mongoose.model('Dizimista', DizimistaSchema)
module.exports = DizimistaModel