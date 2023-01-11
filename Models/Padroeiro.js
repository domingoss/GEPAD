const mongoose = require('mongoose')
const PadroeiroSchema = new mongoose.Schema({
  Nome: String,
  data_criacao: {type: Date, default: Date.now},
  data_actualizacao: {type: Date, default: Date.now }
})

const PadroeiroModel = new mongoose.model('Padroeiro', PadroeiroSchema)
module.exports = PadroeiroModel
